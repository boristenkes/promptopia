'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

export default function Feed() {
	const [searchText, setSearchText] = useState('');
	const [posts, setPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);

	useEffect(() => {
		const searchResults = posts.filter(
			post =>
				post.prompt.includes(searchText) ||
				post.creator.username.includes(searchText) ||
				post.tag.includes(searchText)
		);
		setFilteredPosts(searchResults);
	}, [searchText]);

	useEffect(() => {
		let isMounted = true;
		(async () => {
			const res = await fetch('/api/prompt');
			const data = await res.json();
			if (isMounted) {
				setPosts(data);
				setFilteredPosts(data);
			}
		})();

		return () => (isMounted = false);
	}, []);

	return (
		<section className='feed'>
			<form className='relative w-full flex-center'>
				<input
					type='text'
					placeholder='Search for a tag or a username'
					value={searchText}
					onChange={e => setSearchText(e.target.value)}
					required
					className='search_input peer'
				/>
			</form>
			<PromptCardList
				data={filteredPosts}
				handleTagClick={setSearchText}
			/>
		</section>
	);
}

function PromptCardList({ data, handleTagClick }) {
	return (
		<div className='mt-16 prompt_layout'>
			{data.map(prompt => (
				<PromptCard
					key={prompt._id}
					post={prompt}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
}
