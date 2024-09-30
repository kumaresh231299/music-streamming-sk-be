import PlayList from "../Models/playlistSchema.js";
import User from "../Models/userSchema.js";
import bcrypt from "bcryptjs"

//Get User Details
export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        //Validation if id is provided
        if (!id) {
            return res.status(400).json({ message: "User Id is required" });
        }

        //Fetch the user from the database by id
        const user = await User.findById(id).select('-password');

        //check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User Not found!" })
        }

        //return the user details
        res.status(200).json({ message: "User Details fetched successfully", user })

    } catch (error) {
        console.log("Error Fetching User Details", error);
        res.status(500).json({ message: "Failed to fetch user details. Internal Server error" })
    }
}

//Create Playlist
export const createPlay = async (req, res) => {
    const { userId } = req.params;
    const { newPlaylist } = req.body;
    console.log(req.body);
    try {

        let existingPlaylist = await PlayList.find({
            user: userId,
            playlistName: newPlaylist?.playlistName
        });
        if (existingPlaylist.length !== 0) {
            // If playlist exists, respond with a message
            return res.status(400).json({
                message: `Playlist with the name "${newPlaylist?.playlistName}" already exists.`,
            });

        } else {

            const newPlayLis = new PlayList({
                user: userId,
                playlistName: newPlaylist?.playlistName,
                playlist: newPlaylist?.playlist

            });

            await newPlayLis.save();

            res.status(200).json({ message: "Playlist created successfully", newPlayLis })
        }

    } catch (error) {
        console.log("Error Fetching User Details", error);
        res.status(500).json({ message: "Failed to Create playlist. Internal Server error" })
    }
}

//Update the User
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, password, playlist } = req.body;
    console.log("params: ", req.params);
    console.log("req body: ", req.body);
    console.log("playlist:  ", req.body);
    try {
        //Validation if id is provided
        if (!id) {
            return res.status(400).json({ message: "User Id is required" });
        }

        //Find the user by id
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User Not found!" })
        }

        //Update fields if they are provided in the request body
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) {
            //Check email if already exists for another user
            const emailExists = await User.findOne({ email })
            if (emailExists && emailExists._id.toString() !== id) {
                return res.status(400).json({ message: "Email is already in use by another account" })
            }
            user.email = email;
        }
        if (password) {
            //Hash the new password before saving
            const hashPassword = await bcrypt.hash(password, 10)
            user.password = hashPassword;
        }

        // Handle playlists
        if (playlist && Array.isArray(playlist)) {
            // Iterate through each playlist item
            // playlist.forEach(newPlaylist => {
            //     // Find existing playlist with the same name
            //     const existingPlaylistIndex = user.playlist.findIndex(p => p.playlistName === newPlaylist.playlistName);

            //     if (existingPlaylistIndex !== -1) {
            //         // If found, update the existing playlist details
            //         user.playlist[existingPlaylistIndex] = {
            //             ...user.playlist[existingPlaylistIndex],
            //             ...newPlaylist};
            //     } else {
            //         // If not found, add the new playlist
            //         const newPlaylist = new PlayList({
            //             user:user._id,
            //             playlist: [
            //                 {
            //                     playlistName:newPlaylist.playlistName,
            //                     songDetails:
            //                     {
            //                         name: String,
            //                         desc: String,
            //                         img: String,
            //                         songUrl: String,
            //                         catagory: String,
            //                     }
            //                 }

            //             ]
            //         })
            //     }
            // });

            for (let newPlaylist of playlist) {
                //check if the playlist already exists in the database for the user
                let existingPlaylist = await PlayList.findOne({
                    user: user._id,
                    "playlist.playListName": newPlaylist.playlistName,
                });

                // console.log(newPlaylist);

                // if (existingPlaylist) {
                //     // Update existing playlist details
                //     existingPlaylist.playlist = newPlaylist.playlist;
                //     await existingPlaylist.save();
                //   } else {
                //     const newPlaylist = new PlayList(
                //         {
                //             user: user._id,
                //             playlist: req.body.playlist
                //         }


                //     );

                //     console.log(newPlaylist);
                //     await newPlaylist?.save();
                //   }

                if (existingPlaylist) {
                    // If playlist exists, respond with a message
                    return res.status(400).json({
                        message: `Playlist with the name "${newPlaylist.playlistName}" already exists.`,
                    });

                } else {
                    // Create a new playlist if it doesn't exist
                    const newPlayList = new PlayList({
                        user: user._id,
                        playlist: [
                            {
                                playlistName: newPlaylist.playlistName,
                                songDetails: newPlaylist.songDetails,
                            },
                        ],
                    });

                    await newPlayList.save();
                }

            }
        }

        //Save the updated user details
        await user.save();

        res.status(200).json({ message: "User updated successfully", result: playlist });

    } catch (error) {
        console.log("Error updating user", error);
        res.status(500).json({ message: "Update Failed - internal server error" })
    }
}

//Update playlist
export const getPlaylist = async (req, res) => {

    const { id } = req.params;
    try {
        //Validation if id is provided
        if (!id) {
            return res.status(400).json({ message: "User Id is required" });
        }

        //Fetch the playlist from the database by id
        const playlist = await PlayList.find({ user: id });

        //check if the playlist exists
        if (!playlist) {
            return res.status(404).json({ message: "Playlist Not found!" })
        }

        //return the playlist details
        res.status(200).json({ message: "Playlist Details fetched successfully", playlist })

    } catch (error) {
        console.log("Error fetching playlist details:  ", error);
        res.status(500).json({ message: "Failed to fetch playlist details. Internal Server error" })
    }

}

export const getPlaylistById = async (req, res) => {
    const { id } = req.params; // this is playlist ID

    try {
        // Fetch the playlist from the database by playlist ID
        const playlist = await PlayList.findById(id); // Use `findById`

        if (!playlist) {
            return res.status(404).json({ message: "Playlist Not found!" });
        }

        res.status(200).json({ message: "Playlist fetched successfully", playlist });
    } catch (error) {
        console.log("Error fetching playlist details: ", error);
        res.status(500).json({ message: "Failed to fetch playlist details. Internal Server error" });
    }
};
