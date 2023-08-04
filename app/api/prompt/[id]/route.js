import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export async function GET(req, { params }) {
	try {
		await connectToDB();

		const prompt = await Prompt.findById(params.id);

		if (!prompt) return new Response('Prompt not found', { status: 404 });

		return new Response(JSON.stringify(prompt), { status: 200 });
	} catch (error) {
		console.error(
			`Error fetching prompt with an ID of ${params.id}: ${error.message}`
		);
		return new Response('Failed to fetch prompt', { status: 500 });
	}
}

export async function PATCH(req, { params }) {
	const { prompt, tag } = await req.json();

	try {
		await connectToDB();

		const existingPrompt = await Prompt.findById(params.id);

		if (!existingPrompt)
			return new Response('Prompt not found', { status: 404 });

		existingPrompt.prompt = prompt;
		existingPrompt.tag = tag;

		await existingPrompt.save();

		return new Response(JSON.stringify(existingPrompt), { status: 200 });
	} catch (error) {
		console.error(
			`Error patching prompt with an ID of ${params.id}: ${error.message}`
		);
		return new Response('Failed to patch prompt', { status: 500 });
	}
}

export async function DELETE(req, { params }) {
	try {
		await connectToDB();

		await Prompt.findByIdAndRemove(params.id);

		return new Response('Prompt deleted successfully', { status: 200 });
	} catch (error) {
		console.error(
			`Error deleting prompt with an ID of ${params.id}: ${error.message}`
		);
		return new Response('Failed to delete prompt', { status: 500 });
	}
}
