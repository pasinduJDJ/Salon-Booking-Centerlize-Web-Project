import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME || "SalonSync";

export const handler = async (event) => {
    try {
        // Parse incoming request body
        const body = JSON.parse(event.body);
        const { date, time, stylistId, customerName, customerPhone, service } = body;

        // Basic validation
        if (!date || !time || !stylistId || !customerName) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ message: "Missing required booking details." }),
            };
        }

        // Define PK and SK based on our schema
        const PK = `BOOKING#${date}`; // e.g., BOOKING#2026-05-02
        const SK = `SLOT#${stylistId}#${time}`; // e.g., SLOT#123#09:00

        const command = new PutCommand({
            TableName: TABLE_NAME,
            Item: {
                PK,
                SK,
                customerName,
                customerPhone,
                service,
                status: "CONFIRMED",
                createdAt: new Date().toISOString(),
                entityType: "BOOKING"
            },
            // CRITICAL: This is the Conflict Guard! 
            // It tells DynamoDB to ONLY create this booking if the PK and SK do not already exist.
            ConditionExpression: "attribute_not_exists(PK) AND attribute_not_exists(SK)"
        });

        await docClient.send(command);

        return {
            statusCode: 201,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ message: "Booking confirmed successfully!" }),
        };

    } catch (error) {
        console.error("Booking Error:", error);
        
        // Handle the specific error thrown when a slot is already taken
        if (error.name === "ConditionalCheckFailedException") {
            return {
                statusCode: 409, // 409 Conflict
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ message: "Sorry! This time slot was just booked by someone else." }),
            };
        }

        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ message: "Internal server error" }),
        };
    }
};
