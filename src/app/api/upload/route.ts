import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
// import { OpenAI } from 'openai';
// import { SocialGrowthGPT } from '@/lib/gpt'; // Assumendo che il prompt sia in gpt.ts

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
  }

  if (file.type !== 'text/csv') {
    return NextResponse.json({ error: 'Invalid file type. Please upload a CSV.' }, { status: 400 });
  }

  // // **Logica di Upload su Supabase Storage (esempio)**
  // const fileExtension = file.name.split('.').pop();
  // const fileName = `${user.id}-${Date.now()}.${fileExtension}`;
  // const filePath = `user-uploads/${fileName}`;

  // try {
  //   const { error: uploadError } = await supabase.storage
  //     .from('csv-uploads') // Assicurati che questo bucket esista in Supabase Storage
  //     .upload(filePath, file);

  //   if (uploadError) {
  //     console.error('Supabase Storage upload error:', uploadError);
  //     return NextResponse.json({ error: 'Failed to upload file to storage.', details: uploadError.message }, { status: 500 });
  //   }

  //   // **Qui potresti leggere il contenuto del CSV, passarlo a GPT-4o, e salvare il report**
  //   // const fileContent = await file.text();
  //   // const gptPrompt = SocialGrowthGPT(fileContent; // Modifica la funzione SocialGrowthGPT per accettare il contenuto
  //   // const completion = await openai.chat.completions.create({
  //   //   model: 'gpt-4o',
  //   //   messages: [{ role: 'user', content: gptPrompt }],
  //   // });
  //   // const reportContent = completion.choices[0]?.message?.content;
    
  //   // Salva il report nel database (es. una tabella 'reports' collegata all'utente e al file)
  //   // const { data: reportData, error: reportError } = await supabase
  //   //   .from('reports')
  //   //   .insert({ user_id: user.id, file_path: filePath, report_content: reportContent, status: 'completed' })
  //   //   .select();

  //   // if (reportError) {
  //   //   console.error('Supabase report insert error:', reportError);
  //   //   // Potresti voler gestire la cancellazione del file dallo storage se il salvataggio del report fallisce
  //   //   return NextResponse.json({ error: 'Failed to save report.', details: reportError.message }, { status: 500 });
  //   // }

  //   // Ritorna l'URL del report o un ID per recuperarlo dalla dashboard
  //   // return NextResponse.json({ message: 'File uploaded and report generated successfully.', reportId: reportData[0].id, filePath }, { status: 200 });

  // Placeholder response per ora:
  return NextResponse.json({ 
    message: 'File received successfully. Processing will be implemented.',
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
    // reportUrl: `/dashboard/reports/placeholder-id` // Esempio di URL report
  }, { status: 200 });

  // } catch (error: any) {
  //   console.error('Upload process error:', error);
  //   return NextResponse.json({ error: 'An unexpected error occurred.', details: error.message }, { status: 500 });
  // }
} 