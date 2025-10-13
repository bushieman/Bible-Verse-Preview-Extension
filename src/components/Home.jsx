// modules
import React, { useState, useEffect, useRef } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import WebFont from 'webfontloader';
import { IoBookmarkOutline } from "react-icons/io5";
import { VscBookmark } from "react-icons/vsc";
import { TbCopy } from "react-icons/tb";
import { TbCopyCheck } from "react-icons/tb";
import { TbCopyCheckFilled } from "react-icons/tb";
// components
import BibleVerse from './BibleVerse';
import normalizeReference from './normalizeReference';
import AnimateWord from './AnimateWord';
// assets
import bookmarkAnimation from '../assets/animations/bookmark.json';
import loadingAnimation from '../assets/animations/loading.json';
import errorAnimation from '../assets/animations/error.json';
// css
import './Home.css';
import 'animate.css'; // animation css


function Home({selection}) {
	// State variables
	const [bookmarks, setBookmarks] = useState([]);
	const [cardHeight, setCardHeight] = useState({
		cardContentValue: "327px",
		cardValue: "300px"
	}); // card size to default or compact 
	const [color, setColor] = useState("");
	const [copied, setCopied] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [showAnimation, setShowAnimation] = useState(false);
	const [verseText, setVerseText] = useState("");
	const [version, setVersion] = useState('The Holy Bible. English Standard Version ®')
	
	const selectedWord = normalizeReference(selection) || selection // Normalize the selection
	const [bibleReference, setBibleReference ] = useState("")

	const bookmarkVerse = async () => {
			
	};

	// // Fetch bookmarks from notion
	// useEffect(() => {
	// 	const checkVerseInNotion = async () => {
	// 		try {
	// 		const res = await fetch("https://bushman.pythonanywhere.com/check-verse", {
	// 			method: "POST",
	// 			headers: { "Content-Type": "application/json" },
	// 			body: JSON.stringify({ verse: bibleReference }),
	// 		});

	// 		const result = await res.json();
	// 		setShowAnimation(result.exists);
	// 		} catch (err) {
	// 		console.error("Error checking verse:", err);
	// 		}
	// 	};

	// 	checkVerseInNotion() // Check verse once book is found.
	// }, [bibleReference]);


	useEffect(() => {

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

	// const handleBookmarkClick = async () => {
	// 	console.log("Saving...");
	// 	const res = await fetch("https://bushman.pythonanywhere.com/add-verse", {
	// 		method: "POST",
	// 		headers: { "Content-Type": "application/json" },
	// 		body: JSON.stringify({ bibleReference, verseText }),
	// 	});
	// 	const result = await res.json();
	// 	console.log(result.message || "Saved!");
	// 	setShowAnimation(true)
		
	// };

	const handleCopyClick = () => {
		const verseToCopy = `${bibleReference}, "${verseText.trimEnd()}"`
		navigator.clipboard.writeText(verseToCopy)
		setCopied(true)
		console.log("Verse copied.")
	}

	// Randomize text colors
	// Define a collection of colors
	const colors = [
		'#adff2f',
		'#B7FFFA',
		'#FF7F50',
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
											word={bibleReference}
											color={color}
										/>
									</div>
								</div>

								{loading? '':<div className="line"></div>}

								<div className="bottom-container">
									<div className="bottom">
										<text style={{ color }}>
											{selectedWord ? (
												<BibleVerse
												reference={selectedWord}
												setCardHeight={setCardHeight}
												setLoading={setLoading}
												setError={setError}
												bookmarks={bookmarks}
												setDisabled={setDisabled}
												setVerseText={setVerseText}
												setBibleReference={setBibleReference}
												/>
											) : null}
										</text>
									</div>
								</div>

								{/* {loading? '': <div
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
										<VscBookmark className="bookmark-icon animate__animated animate__wobble" disable={disabled}/>
									)}
								</div>} */}
								{loading? '': <div
									className="copy"
									style={{ color: color }}
									>
									{copied ? (
										<TbCopyCheckFilled className="copy-icon" /> 
									) : (
										<TbCopy onClick={handleCopyClick} className="copy-icon animate__animated animate__wobble" />
									)}
								</div>}
								
								{loading? '':<div className="version">{version}</div>}

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
