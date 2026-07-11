const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function extractCRM(records) {
  const prompt = `
You are a CRM data extraction AI.

Convert the following CSV records into this JSON format:

[
{
"created_at":"",
"name":"",
"email":"",
"country_code":"",
"mobile_without_country_code":"",
"company":"",
"city":"",
"state":"",
"country":"",
"lead_owner":"",
"crm_status":"",
"crm_note":"",
"data_source":"",
"possession_time":"",
"description":""
}
]

Rules:
1. Extract as many fields as possible.
2. Skip records that have neither email nor mobile.
3. Return ONLY valid JSON.
4. Do not explain anything.

CSV Records:
${JSON.stringify(records)}
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0,
  });

  return completion.choices[0].message.content;
}

module.exports = extractCRM;