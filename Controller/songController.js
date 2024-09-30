import cloudinary from "../Utils/cloudinary.js";

export const getAudioLinks = async(req,res)=>{
    try {
        const resources = await cloudinary.search
        .expression('folder:audio')             //Adjust the folder name accordingly
        .sort_by('public_id','desc')
        .max_results(14)        //limit to 14 results if needed
        .execute();

        const audioLinks = resources.resources.map(file=>file.secure_url)

        res.status(200).json({success:true,message:"Successfully fetching audio files",result:[
            {
                name:"Whistle Podu",
                desc: "The song is a celebration of friendship and pays homage to Venkat Prabhu's previous films.Vijay, Venkat Prabhu, Yuvan Shankar Raja, and Premgi Amaren sang the song.",
                img:"https://static.toiimg.com/thumb/msid-109308686,width-1280,height-720,resizemode-4/109308686.jpg",
                songUrl:audioLinks[0],
                catagory:"Party song"
            },
            {
                name:"Vaa Vaathi",
                desc: "Vaathi is about a woman's longing for her lover and the budding romance between two college teachers.",
                img:"https://i.pinimg.com/originals/65/b5/bd/65b5bdd550031e2b41731fee4610cad0.jpg",
                songUrl:audioLinks[1],
                catagory:"Love song"
            },
            {
                name:"Unakku Thaan",
                desc: "Unakku Thaan is a song from the 2023 Tamil movie Chithha.Artists The song is sung by Santhosh Narayanan and Dhvani Kailas, and composed by Santhosh Narayanan. Vivek wrote the lyrics.",
                img:"https://i.ytimg.com/vi/QmGb8Cu7c5A/sddefault.jpg?sqp=-oaymwEmCIAFEOAD8quKqQMa8AEB-AHSBoAC4AOKAgwIABABGHIgVyg5MA8=&rs=AOn4CLCz03VJFOVKVtxfmmAoDE1SZ6Nt8w",
                songUrl:audioLinks[2],
                catagory:"Melody song"
            },
            {
                name:"Pirai Thedum Iravilae",
                desc: "Mayakkam Enna is a psychological drama film written and directed by Selvaraghavan.The song was written by Dhanush and composed by G.V. Prakash Kumar, who also sang it along with Saindhavi.",
                img:"https://i.pinimg.com/736x/c3/c7/97/c3c797501763f9e10c5433da435d13eb.jpg",
                songUrl:audioLinks[3],
                catagory:"Breakup song"
            },
            {
                name:"Naan Kudikka Poren",
                desc: "The tamil album song, released in 2019.Artists The song is sung by Selojan, Ratty Adhiththan, and Sahi Siva.",
                img:"https://static.toiimg.com/thumb/msid-73084554,width-400,resizemode-4/73084554.jpg",
                songUrl:audioLinks[4],
                catagory:"Party song"
            },
            {
                name:"Mudhal Nee Mudivum Nee",
                desc: "The song is known for its lilting melody, and is a collaboration between Darbuka Siva, Sid Sriram, and Thamarai.",
                img:"https://timesofindia.indiatimes.com/photo/88958505.cms",
                songUrl:audioLinks[5],
                catagory:"Love song"
            },
            {
                name:"Matta",
                desc: "The song Matta from the movie The Greatest of All Time (GOAT) is a major highlight of the film.",
                img:"https://i.ytimg.com/vi/8bfH0EYn0Pg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDk1LvQYpFOBtL6zyV8JPWtTabDEw",
                songUrl:audioLinks[6],
                catagory:"Party song"
            },
            {
                name:"Katchi Sera",
                desc: "This Tamil song by Sai Abhyankkar from the 2024 album Katchi Sera by Think Indie. The song is 3 minutes and 1 second long.",
                img:"https://lyricsraaga.com/wp-content/uploads/2024/02/Katchi-Sera-Song-Lyrics.jpg",
                songUrl:audioLinks[7],
                catagory:"Love song"
            },
            {
                name:"Kanavae Kanavae",
                desc: "This song love failure song.Composer and singer Anirudh Ravichander composed and sang the song.",
                img:"https://i.scdn.co/image/ab67616d0000b2736b484c5fe1128f59f3a6a11f",
                songUrl:audioLinks[8],
                catagory:"Breakup song"
            },
            {
                name:"Hi Sonna Pothum",
                desc: "The song features Jayam Ravi and Samyuktha Hegde.Artist The song is sung by Kaushik Krish and Hiphop Tamizha.",
                img:"https://c.saavncdn.com/410/Hi-Sonna-Pothum-From-Comali--Tamil-2019-20190731101823-500x500.jpg",
                songUrl:audioLinks[9],
                catagory:"Love song"
            },
            {
                name:"Hanumankind",
                desc: "'Big Dawgs' is an anthem of resilience and ambition. Hanumankind's lyrics reflect his journey and the broader aspirations of his generation, emphasizing themes of hard work and determination.",
                img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjwtVPwTU3pGpTj6OMLnSuOELhR1pLySh8_A&s",
                songUrl:audioLinks[10],
                catagory:"Party song"
            },
            {
                name:"En Fuse Pochu",
                desc: "The song is part of the album Konjam Kaadhal Konjam Galatta.Artists The song is sung by Karthik and Ramya NSK, with music by Yuvanshankar Raja.",
                img:"https://c-fa.cdn.smule.com/rs-s77/arr/b4/54/78a4664e-bbe0-495d-bc80-d14b8fe1ec70.jpg",
                songUrl:audioLinks[11],
                catagory:"Love song"
            },
            {
                name:"Bae",
                desc: "The song story of hero and heroine first outing.Artists The song is sung by Anirudh Ravichander and Adithya RK.",
                img:"https://i.pinimg.com/736x/30/42/3c/30423c014224ec9b6d697baaef0c71ef.jpg",
                songUrl:audioLinks[12],
                catagory:"Party song"
            },
            {
                name:"Aasa Kooda",
                desc: "The music video shows the duo dancing and expressing their feelings. Some viewers praised the cinematography and the way the artists played with light, camera, and position.Singers Sai Abhyankkar and Sai Smriti.",
                img:"https://i.scdn.co/image/ab67616d00001e0274a555ea03b0844b1e1d4513",
                songUrl:audioLinks[13],
                catagory:"Love song"
            }
        ]});
    } catch (error) {
        res.status(500).json({success:false,message:"Error fetching audio files",error:error.message});
    }
}