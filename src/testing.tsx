import React, { Component } from "react";
import axios from "axios";

const Testing = () => {
	const get = async () => {
		const options = {
			method: "GET",
			url: "https://youtube-v31.p.rapidapi.com/search",
			params: {
				relatedToVideoId: "7ghhRHRP6t4",
				part: "id,snippet",
				type: "video",
				maxResults: "50",
			},
			headers: {
				"X-RapidAPI-Key": "dd43affb91mshc176a6272bc0c83p1f8558jsn4b947eb65cd2",
				"X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
			},
		};

		try {
			const response = await axios.request(options);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	get();

	return <div></div>;
};

export default Testing;
