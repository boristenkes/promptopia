'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

export default function EditPrompt() {
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({ prompt: '', tag: '' });
	const searchParams = useSearchParams();
	const promptId = searchParams.get('id');

	useEffect(() => {
		if (promptId) {
			(async () => {
				const res = await fetch(`api/prompt/${promptId}`);
				const data = await res.json();
				setPost({
					prompt: data.prompt,
					tag: data.tag
				});
			})();
		}
	}, [promptId]);

	const editPrompt = async e => {
		e.preventDefault();
		setSubmitting(true);

		if (!promptId) return alert('Prompt ID not found');

		try {
			const res = await fetch(`/api/prompt/${promptId}`, {
				method: 'PATCH',
				body: JSON.stringify(post)
			});
			if (res.ok) {
				router.push('/');
			}
		} catch (error) {
			console.error('Error editing new prompt: ' + error.message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Form
			type='Edit'
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={editPrompt}
		/>
	);
}
