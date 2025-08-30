// modules
import React, { useState, useEffect, useRef } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import WebFont from 'webfontloader';
import { IoBookmarkOutline } from 'react-icons/io5';
// components
import BibleVerse from "./BibleVerse";
import normalizeReference from './Regex';
import AnimateWord from './AnimateWord';
// assets
import bookmarkAnimation from '../assets/animations/bookmark.json';
import loadingAnimation from '../assets/animations/loading.json';
import errorAnimation from '../assets/animations/error.json';
// css
import './Home.css';


function Home({selection}) {
	const selectedWord = normalizeReference(selection) || selection // Normalize the selection

	// State variables
	const [version, setVersion] = useState('The Holy Bible. English Standard Version ®')
	const [error, setError] = useState(false);
	const [color, setColor] = useState('');
	const [loading, setLoading] = useState(false);
	const [showAnimation, setShowAnimation] = useState(false);
	const [verseContent, setVerseContent] = useState("");
	const [cardHeight, setCardHeight] = useState({
		cardContentValue: "327px",
		cardValue: "300px"
	}); // card size to default or compact 

	useEffect(() => {
		// Activate the loading animation
		setLoading(true)

		// Pre-load the fonts
		WebFont.load({
			custom: {
				families: ['garet-bold', 'circular-pro'], // Name from @font-face
			},
			active() {
				console.log('Fonts have been loaded');
			},
			inactive() {
				console.log('Failed to load fonts');
			},
		});

		// Get a random color from the colors collection
		const randomColor = colors[Math.floor(Math.random() * colors.length)];
		setColor(randomColor);
	}, []);

  	const handleBookmarkClick = async (selectedWord, verseContent) => {
		setShowAnimation(!showAnimation);
	};

	// Randomize text colors
	// Define a collection of colors
	const colors = [
		'#adff2f',
		'#EE918D',
		'#B7FFFA',
		'#FF7F50',
		'#F4B393',
		'#FF9B42',
		'#C6D8FF',
		'#87CEEB',
		'#FF7518',
		'#bca4dfff',
	];

	return (
		<>
			<div
				className="card-container"
				style={{ height: cardHeight.cardContentValue }}>
				<div className="top-tape"></div>
				<div
					className="card"
					style={{ height: cardHeight.cardValue }}>
					<div className="card-content">
						{selectedWord ? (
							<div className="word-content">
								<div className="top">
									<div>
										<AnimateWord
											word={selectedWord}
											color={color}
										/>
									</div>
								</div>

								<div className="line"></div>

								<div className="bottom-container">
									<div className="bottom">
										<text style={{ color }}>
											{selectedWord ? (
												<BibleVerse
												reference={selectedWord}
												setCardHeight={setCardHeight}
												setLoading={setLoading}
												setError={setError}
												/>
											) : null}
										</text>
									</div>
								</div>

								{/* <div
									className="bookmark"
									style={{ color: color }}
									onClick={handleBookmarkClick}>
									{showAnimation ? (
										<Player
											autoplay
											loop={false} // Ensure it doesn't loop
											keepLastFrame
											src={bookmarkAnimation} // Path to your Lottie JSON file
											style={{
												height: '50px',
												width: '50px',
											}} // Adjust the size
										/>
									) : (
										<IoBookmarkOutline className="bookmark-icon" />
									)}
								</div> */}
								
								<div className="version">{version}</div>

							</div>
						) : (
							<div></div>
						)}
					</div>

					{/* Absolute positioned div for rendering loading animation on top of the card when loading is activated.*/}
					<div
						className={`${
							loading ? 'loading-active' : 'loading-hidden'
						}`}>
						<Player
							autoplay
							loop={true} // Ensure it doesn't loop
							// keepLastFrame
							src={loadingAnimation} // Path to your Lottie JSON file
							// style={{ height: '450px', width: '450px' }} // Adjust the size
						/>
					</div>

					{/* Absolute positioned div for rendering error animation on top of the card when error is activated.*/}
					<div
						className={`${
							error ? 'error-active' : 'error-hidden'
						}`}>
						<Player
							autoplay
							loop={true} // Ensure it doesn't loop
							// keepLastFrame
							src={errorAnimation} // Path to your Lottie JSON file
							style={{ height: '270px', width: '270px' }} // Adjust the size
						/>
					</div>

				</div>
			</div>
		</>
	);
}

export default Home;
