'use server'

import OpenAI from "openai";
import {createClient} from '@/utils/supabase/server'

export async function POST(req: Request) {
    const openai = new OpenAI();
    const supabase = createClient()

    const responseBody = await req.json()
    const {text, email} = responseBody

    if (!text) {
        return new Response('Text is required', {
            status: 400,
        })
    }

    if (!email) {
        return new Response('Email is required', {
            status: 400,
        })
    }

    const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
        encoding_format: "float",
    });

    const [{embedding}] = embeddingResponse.data

    await supabase.from('documents').insert({
        content: text,
        email: email,
        embedding: embedding
    })

    return Response.json({embedding})
}

export async function GET() {
    const supabase = createClient()

    // const { data: documents } = await supabase.rpc('match_documents', {
    //     query_embedding: embedding,
    //     match_threshold: 0.78, // Choose an appropriate threshold for your data
    //     match_count: 10, // Choose the number of matches
    // })

    const { data: documents } = await supabase.from('documents').select('*')

    return Response.json(documents)
}
