import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME || "SalonSync";

export const handler = async (event) => {
    try {
        // The Admin Dashboard will pass the date it wants to view
        // Example: /bookings?date=2026-05-02
        const { date } = event.queryStringParameters || {};

        if (!date) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ message: "Missing date parameter." }),
            };
        }

        // We query DynamoDB for ALL bookings on this specific Date
        // Because of our Single-Table Design, passing only the PK gives us 
        // every single stylist's bookings for that day instantly.
        const PK = `BOOKING#${date}`;

        const command = new QueryCommand({
            TableName: TABLE_NAME,
            KeyConditionExpression: "PK = :pk",
            ExpressionAttributeValues: {
                ":pk": PK
            }
        });

        const response = await docClient.send(command);

        // Map the raw DynamoDB items into a cleaner format for the frontend
        const bookings = response.Items.map(item => {
            // Extract the stylistId and time from the SK (SLOT#123#09:00)
            const parts = item.SK.split("#");
            return {
                id: item.SK, // We can use the SK as a unique ID for the frontend keys
                stylistId: parts[1],
                time: parts[2],
                customerName: item.customerName,
                customerPhone: item.customerPhone,
                service: item.service,
                status: item.status,
                createdAt: item.createdAt
            };
        });

        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({
                date,
                bookings, // The Admin Dashboard will map these into the Grid View
            }),
        };

    } catch (error) {
        console.error("Get Bookings Error:", error);
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ message: "Internal server error" }),
        };
    }
};
