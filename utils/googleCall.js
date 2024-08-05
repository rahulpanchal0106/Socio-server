const googleCall=async(prompt)=>{
    require('dotenv').config();
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const generationConfig = {
        stopSequences: ["red"],
        maxOutputTokens: 200,
        temperature: 0.1, 
        topP: 0.3,        
        topK: 10,       
    };

    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro",generationConfig:generationConfig });

    // const categories0 = ["Entertainment","Fashion","Food","Games","Technology","Sports","Travel","Health and Fitness","Education","News","Lifestyle","Business","Art and Design","Music","Science","Pets and Animals","NSFW","18+","Memes","Politics","Finance","Automotive","DIY and Crafts","Parenting","Home and Garden","Literature","Photography","Movies and TV Shows","Fitness and Wellness","Spirituality","History","Relationships and Dating","Comedy","Beauty","Nature and Outdoors","Hobbies and Interests","Animals and Wildlife","Environment","Social Issues","Gaming","Humor","Inspiration","Motivation","Startups","Marketing","Entrepreneurship","Psychology","Architecture","Real Estate","Agriculture" ];
    // const postCategories = ["Entertainment","Fashion","Food","Games","Technology","Sports","Travel","Health and Fitness","Education","News","Lifestyle","Business","Art and Design","Music","Science","Pets and Animals","NSFW","18+","Memes","Politics","Finance","Automotive","DIY and Crafts","Parenting","Home and Garden","Literature","Photography","Movies and TV Shows","Fitness and Wellness","Spirituality","History","Relationships and Dating","Comedy","Beauty","Nature and Outdoors","Hobbies and Interests","Animals and Wildlife","Environment","Social Issues","Gaming","Humor","Inspiration","Motivation","Startups","Marketing","Entrepreneurship","Psychology","Architecture","Real Estate","Agriculture","Technology Reviews","Virtual Reality","Gadgets","Travel Tips","Food Recipes","Personal Development","Finance Tips","Career Advice","Relationship Advice","Book Reviews","Movie Reviews","TV Show Reviews","Music Reviews","Fitness Tips","Health Tips","Art Tutorials","Craft Tutorials","Event Highlights","Daily Life","Cultural Events","Charity and Volunteering","Pet Care","Home Improvement","DIY Projects","Cooking Tips","Fashion Trends","Tech News","Sports"];
    // const image = {
    // inlineData: {
    //     data: Buffer.from(fs.readFileSync("cookie.png")).toString("base64"),
    //     mimeType: "image/png",
    // },
    // };
    try{
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        return {result: result.response.text()};
    }catch(e){
        console.log(e)
        return {result: ""};
    }

}
module.exports = googleCall;