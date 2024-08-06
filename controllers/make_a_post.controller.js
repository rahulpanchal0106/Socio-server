const posts_db = require('../models/posts.model');
const googleCall = require('../utils/googleCall');
const generate_UID = require('../utils/uidGenerator')
const makePost = async(req,res)=>{
    const {post, metaData} = req.body;
    const prompt = `
        From the given list of categories, I want you to identify the given post and return its category.
        if it doesn't match any return "Other",
        const postCategories = [
        // Entertainment
        "Movies",
        "TV Shows",
        "Music",
        "Comedy",
        "Celebrity News",
        
        // Fashion
        "Trends",
        "Street Style",
        "Accessories",
        "Seasonal Fashion",
        "Fashion Reviews",
        
        // Food
        "Recipes",
        "Restaurant Reviews",
        "Food Photography",
        "Cooking Tips",
        "Food Culture",
        
        // Games
        "Video Games",
        "Board Games",
        "Esports",
        "Gaming Tips",
        "Game Development",
        
        // Technology
        "Tech Reviews",
        "Gadgets",
        "Software",
        "Tech News",
        "Innovations",
        
        // Sports
        "Soccer",
        "Basketball",
        "Tennis",
        "Football",
        "Sports News",
        
        // Travel
        "Destinations",
        "Travel Tips",
        "Travel Photography",
        "Adventure Travel",
        "Travel Vlogs",
        
        // Health and Fitness
        "Workout Routines",
        "Healthy Eating",
        "Mental Health",
        "Fitness Tips",
        "Yoga",
        
        // Education
        "Study Tips",
        "Learning Resources",
        "Online Courses",
        "Educational News",
        "Academic Research",
        
        // News
        "Breaking News",
        "Politics",
        "International News",
        "Local News",
        "Economic News",
        
        // Lifestyle
        "Daily Life",
        "Home Decor",
        "Relationships",
        "Self-Care",
        "Life Hacks",
        
        // Business
        "Entrepreneurship",
        "Marketing",
        "Finance",
        "Startup Advice",
        "Industry News",
        
        // Art and Design
        "Art",
        "Design",
        "Photography",
        "Illustration",
        "Art Exhibitions",
        
        // Music
        "Music Genres",
        "Artists",
        "Albums",
        "Concerts",
        "Music Reviews",
        
        // Science
        "Space",
        "Biology",
        "Physics",
        "Chemistry",
        "Scientific Research",
        
        // Pets and Animals
        "Pet Care",
        "Animal Behavior",
        "Wildlife",
        "Pet Health",
        "Animal Rescues",
        
        // NSFW
        "Adult Content",
        "Mature Themes",
        "Explicit Content",
        "Sensual Art",
        "Adult Humor",
        
        // 18+
        "Adult Content",
        "Mature Themes",
        "Explicit Content",
        "Dating",
        "Sexual Health",
        
        // Memes
        "Funny Memes",
        "Dank Memes",
        "Reaction Memes",
        "Trend Memes",
        "Meme Templates",
        
        // Politics
        "Political News",
        "Election Updates",
        "Government Policies",
        "Political Analysis",
        "Activism",
        
        // Finance
        "Investment Tips",
        "Personal Finance",
        "Stock Market",
        "Cryptocurrency",
        "Budgeting",
        
        // Automotive
        "Car Reviews",
        "Auto News",
        "Car Maintenance",
        "Driving Tips",
        "Electric Vehicles",
        
        // DIY and Crafts
        "Craft Tutorials",
        "DIY Projects",
        "Home Decor DIY",
        "Upcycling",
        "Craft Supplies",
        
        // Parenting
        "Parenting Tips",
        "Child Development",
        "Family Activities",
        "Educational Activities",
        "Parenting Stories",
        
        // Home and Garden
        "Home Improvement",
        "Gardening Tips",
        "Interior Design",
        "Outdoor Spaces",
        "Home Decor",
        
        // Literature
        "Book Reviews",
        "Author Spotlights",
        "Reading Lists",
        "Poetry",
        "Literary Genres",
        
        // Photography
        "Photo Tips",
        "Photography Techniques",
        "Photo Challenges",
        "Photography Equipment",
        "Photo Editing",
        
        // Movies and TV Shows
        "Movie Reviews",
        "TV Show Reviews",
        "Upcoming Releases",
        "Actor Interviews",
        "Film Genres",
        
        // Fitness and Wellness
        "Workout Routines",
        "Healthy Lifestyle",
        "Mental Wellness",
        "Fitness Challenges",
        "Wellness Tips",
        
        // Spirituality
        "Meditation",
        "Mindfulness",
        "Spiritual Practices",
        "Religious Studies",
        "Personal Growth",
        
        // History
        "Historical Events",
        "Historical Figures",
        "Ancient Civilizations",
        "Modern History",
        "Historical Research",
        
        // Relationships and Dating
        "Dating Tips",
        "Relationship Advice",
        "Couple Activities",
        "Communication Tips",
        "Dating Apps",
        
        // Comedy
        "Stand-Up Comedy",
        "Comedy Skits",
        "Funny Videos",
        "Comedy Shows",
        "Humorous Stories",
        
        // Beauty
        "Beauty Tips",
        "Makeup Tutorials",
        "Skincare Routines",
        "Haircare Tips",
        "Beauty Trends",
        
        // Nature and Outdoors
        "Nature Photography",
        "Outdoor Adventures",
        "Hiking",
        "Camping",
        "Wildlife",
        
        // Hobbies and Interests
        "Crafting",
        "Collecting",
        "Gaming",
        "Photography",
        "Music",
        
        // Animals and Wildlife
        "Wildlife Conservation",
        "Pet Care",
        "Animal Rescues",
        "Endangered Species",
        "Animal Behavior",
        
        // Environment
        "Climate Change",
        "Recycling",
        "Sustainable Living",
        "Eco-Friendly Products",
        "Conservation Efforts",
        
        // Social Issues
        "Human Rights",
        "Equality",
        "Social Justice",
        "Activism",
        "Community Initiatives",
        
        // Gaming
        "Game Reviews",
        "Gaming News",
        "Gaming Strategies",
        "Esports Tournaments",
        "Game Releases",
        
        // Humor
        "Jokes",
        "Funny Stories",
        "Comedic Skits",
        "Satirical Content",
        "Humorous Observations",
        
        // Inspiration
        "Quotes",
        "Success Stories",
        "Personal Growth",
        "Motivational Speeches",
        "Life Lessons",
        
        // Motivation
        "Motivational Quotes",
        "Success Tips",
        "Goal Achievement",
        "Personal Development",
        "Motivational Stories",
        
        // Startups
        "Startup Tips",
        "Entrepreneur Stories",
        "Funding Advice",
        "Business Models",
        "Market Trends",
        
        // Marketing
        "Marketing Strategies",
        "Social Media Marketing",
        "Content Marketing",
        "Email Marketing",
        "SEO Tips",
        
        // Entrepreneurship
        "Business Ideas",
        "Entrepreneurial Skills",
        "Startup Advice",
        "Leadership Tips",
        "Networking",
        
        // Psychology
        "Mental Health",
        "Behavioral Science",
        "Therapy",
        "Psychological Research",
        "Self-Care Strategies",
        
        // Architecture
        "Architectural Designs",
        "Urban Planning",
        "Modern Architecture",
        "Interior Design",
        "Landscape Architecture",
        
        // Real Estate
        "Property Listings",
        "Market Trends",
        "Home Buying Tips",
        "Home Selling Tips",
        "Real Estate Investing",
        
        // Agriculture
        "Farming Techniques",
        "Crop Management",
        "Agricultural Technology",
        "Sustainable Farming",
        "Livestock Care"
    ];


    post: ${post.content}
    

    ` ;
    const cat = await googleCall(prompt);
    console.log("🐈🐈🐈🐈 ",cat)
    var data;
    try{
        const upid=generate_UID();
        
        data = {
            post: post,
            metaData: metaData,
            upid: upid,
            category:cat.result
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