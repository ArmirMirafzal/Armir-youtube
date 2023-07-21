import React, { Component } from "react";
import axios from "axios";

const Testing = () => {
	const get = async () => {
		const options = {
			method: 'GET',
			url: 'https://moviesdatabase.p.rapidapi.com/titles/x/upcoming',
			headers: {
					'X-RapidAPI-Key': 'e032783f43mshe8aff82b469d74bp151807jsnaa8b1ebd1b19',
					'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
			}
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
