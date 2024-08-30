const posts_db = require('../models/posts.model');
const googleCall = require('../utils/googleCall');
const generate_UID = require('../utils/uidGenerator')
const makePost = async(req,res)=>{
    const {post, metaData,upid, postImg} = req.body;
    const prompt = `
        Based on the following categories, determine the category or emotion of the given post. Take into account the context, sarcasm, and emotion expressed in the post to ensure accurate categorization. If the post is short and lacks clear context, identify and return the primary emotion expressed without labeling it as an emotion. If the post does not clearly fit into any category or express an identifiable emotion, return the closest matching category or emotion. Only return "Other" if the post neither fits any category nor expresses any emotion.
        Categories for referance : [
        "Entertainment",
        "Fashion",
        "Food",
        "Games",
        "Technology",
        "Sports",
        "Travel",
        "Health and Fitness",
        "Education",
        "News",
        "Lifestyle",
        "Business",
        "Art and Design",
        "Science",
        "Pets and Animals",
        "NSFW",
        "Memes",
        "Politics",
        "Finance",
        "Automotive",
        "DIY and Crafts",
        "Parenting",
        "Home and Garden",
        "Literature",
        "Photography",
        "Movies and TV Shows",
        "Fitness and Wellness",
        "Spirituality",
        "History",
        "Relationships and Dating",
        "Comedy",
        "Beauty",
        "Nature and Outdoors",
        "Hobbies and Interests",
        "Animals and Wildlife",
        "Environment",
        "Social Issues",
        "Humor",
        "Inspiration",
        "Motivation",
        "Startups",
        "Marketing",
        "Entrepreneurship",
        "Psychology",
        "Architecture",
        "Real Estate",
        "Agriculture"
    ]
    and 
    Emotions for referance = [
        "Happy",
        "Sad",
        "Angry",
        "Excited",
        "Fearful",
        "Surprised",
        "Disgusted",
        "Confused",
        "Hopeful",
        "Anxious",
        "Proud",
        "Embarrassed",
        "Bored",
        "Content",
        "Amused",
        "Grateful",
        "Jealous",
        "Guilty",
        "Lonely",
        "Nostalgic"
    ];
    post: ${post.content}
    ` ;

    const cat = await googleCall(prompt);
    console.log("🐈🐈🐈🐈 ",cat)
    
    var data;
    
    try{
        
        
        data = {
            post: post,
            metaData: metaData,
            upid: upid,
            category:cat.result,
            postImg:postImg
        }
        // console.log(data)
    }catch(e){
        console.log("Error in make_a_post: ",e);
    }

    try{
        console.log("🟡 Making a post by ",metaData.author);
        await posts_db.create(data);
        console.log("🟢 Done Making a post by ",metaData.author, data);
        res.status(201).json({message: "Post Create Successfully"});
    }catch(e){
        console.log("🔴 Error creating Post: ",e);
        res.status(500).json({message:"Internal Server Error"})
    }
}
module.exports = makePost