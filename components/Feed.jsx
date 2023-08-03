'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

export default function Feed() {
	const [searchText, setSearchText] = useState('');
	const [posts, setPosts] = useState([]);

	const handleSearchChange = e => {};

	useEffect(() => {
		(async () => {
			const res = await fetch('/api/prompt');
			const data = await res.json();
			setPosts(data);
		})();
	}, []);

	return (
		<section className='feed'>
			<form className='relative w-full flex-center'>
				<input
					type='text'
					placeholder='Search for a tag or a username'
					value={searchText}
					onChange={handleSearchChange}
					required
					className='search_input peer'
				/>
			</form>
			<PromptCardList
				data={posts}
				handleTagClick={() => {}}
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
