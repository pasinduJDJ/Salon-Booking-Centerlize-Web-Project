import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME || "SalonSync";

export const handler = async (event) => {
    try {
        // We expect the frontend to pass the date and stylistId as query string parameters
        // Example: /availability?date=2026-05-02&stylistId=123
        const { date, stylistId } = event.queryStringParameters || {};

        if (!date || !stylistId) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ message: "Missing date or stylistId parameter." }),
            };
        }

        // We query DynamoDB for this specific Date and Stylist
        // We use begins_with to only get slots for this specific stylist
        const PK = `BOOKING#${date}`;
        const skPrefix = `SLOT#${stylistId}#`;

        const command = new QueryCommand({
            TableName: TABLE_NAME,
            KeyConditionExpression: "PK = :pk AND begins_with(SK, :skPrefix)",
            ExpressionAttributeValues: {
                ":pk": PK,
                ":skPrefix": skPrefix
            }
        });

        const response = await docClient.send(command);

        // Extract just the times that are booked
        // SK looks like "SLOT#123#09:30". We split by "#" and grab the last part.
        const bookedTimes = response.Items.map(item => item.SK.split("#")[2]);

        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({
                date,
                stylistId,
                bookedTimes: bookedTimes // The frontend will use this to grey out unavailable slots!
            }),
        };

    } catch (error) {
        console.error("Get Availability Error:", error);
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ message: "Internal server error" }),
        };
    }
};
