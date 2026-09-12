const { app, input, output } = require('@azure/functions');

// Define the Cosmos DB input binding to read the item
const cosmosInput = input.cosmosDB({
    databaseName: 'ResumeDB',
    containerName: 'Counter',
    id: '1',
    partitionKey: '1',
    connection: 'CosmosDBConnectionString'
});

// Define the Cosmos DB output binding to save the item back
const cosmosOutput = output.cosmosDB({
    databaseName: 'ResumeDB',
    containerName: 'Counter',
    connection: 'CosmosDBConnectionString'
});

app.http('GetResumeCounter', {
    methods: ['GET'],
    authLevel: 'anonymous',
    extraInputs: [cosmosInput],
    extraOutputs: [cosmosOutput],
    handler: async (request, context) => {
        // 1. Get the current counter document from the input binding
        const counterItem = context.extraInputs.get(cosmosInput);

        if (!counterItem) {
            return { status: 404, body: "Counter record item not found in DB." };
        }

        // 2. Increment the count value by 1
        counterItem.count += 1;

        // 3. Send the updated document to the output binding to save it
        context.extraOutputs.set(cosmosOutput, counterItem);

        // 4. Return the updated counter item back to your frontend website
        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(counterItem)
        };
    }
});

