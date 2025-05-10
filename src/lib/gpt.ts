// import OpenAI from 'openai';

// // Inizializza il client OpenAI (fallo una volta, magari in un file di configurazione API o all'avvio)
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // Assicurati che la tua API key sia configurata nelle variabili d'ambiente
// });

/**
 * Genera un prompt per GPT-4o per analizzare i dati dei tweet e fornire suggerimenti di crescita.
 * @param csvContent Il contenuto del file CSV come stringa.
 * @param userHandle L'handle X (Twitter) dell'utente (opzionale, per personalizzazione).
 * @returns Il prompt formattato per GPT-4o.
 */
export function SocialGrowthGPT(csvContent: string, userHandle?: string): string {
  // Qui potresti aggiungere una logica per estrarre le colonne rilevanti dal CSV
  // o per pre-processare i dati se necessario.
  // Per ora, assumiamo che il CSV contenga almeno colonne come 'Tweet text', 'Impressions', 'Engagement rate', 'Likes', 'Retweets'.

  const intro = userHandle 
    ? `Analizza i seguenti dati di tweet per l'utente ${userHandle} e fornisci un report di crescita per il suo account X (Twitter).`
    : `Analizza i seguenti dati di tweet e fornisci un report di crescita per un account X (Twitter).`;

  return `
${intro}

I dati dei tweet (estratti da un CSV) sono:
"""
${csvContent}
"""

Basandoti su questi dati, per favore fornisci:

1.  **Analisi Generale delle Performance (Overall Performance Analysis):**
    *   Un riassunto delle metriche chiave (impression totali/medie, engagement rate medio, like medi, retweet medi).
    *   Identifica i punti di forza e di debolezza evidenti dai dati.

2.  **Top Performing Tweets (Analisi dei Tweet Migliori):**
    *   Identifica 2-3 tweet che hanno performato eccezionalmente bene (basati su engagement rate, impression, o una combinazione).
    *   Per ciascuno, spiega perché potrebbero aver funzionato bene (es. tipo di contenuto, call to action, orario di pubblicazione se disponibile, uso di media).
    *   Quali lezioni si possono trarre da questi successi?

3.  **Tweet con Basse Performance (Analysis of Underperforming Tweets):**
    *   Identifica 2-3 tweet che hanno avuto performance sotto la media.
    *   Per ciascuno, ipotizza perché potrebbero non aver funzionato (es. argomento, tono, mancanza di call to action, orario).
    *   Cosa si potrebbe migliorare o evitare in futuro basandosi su questi?

4.  **Pattern e Trend Emergenti (Emerging Patterns & Trends):**
    *   Ci sono tipi di contenuto (es. domande, thread, annunci, link esterni, immagini, video) che sembrano performare costantemente meglio o peggio?
    *   Ci sono argomenti o temi ricorrenti nei tweet di successo o in quelli meno efficaci?
    *   (Se i dati includono timestamp) Ci sono indicazioni su orari o giorni migliori per postare?

5.  **Suggerimenti Pratici per la Crescita (Actionable Growth Suggestions):**
    *   Fornisci 3-5 suggerimenti concreti e attuabili che l'utente può implementare per migliorare l'engagement e la crescita del proprio account X.
    *   I suggerimenti dovrebbero essere basati specificamente sull'analisi dei dati forniti.
    *   Esempi: "Considera di postare più domande aperte, dato che il tweet X ha generato molto engagement", "Sperimenta con l'aggiunta di immagini ai tuoi annunci, dato che i tweet testuali puri hanno avuto meno impression".

6.  **Proposta di Badge di Crescita (Growth Badge Proposal):**
    *   Basandoti sull'analisi, suggerisci un "Growth Badge" che l'utente ha guadagnato. Sii creativo ma realistico. Esempi:
        *   'Rising Storyteller' (se i thread funzionano bene)
        *   'Engagement Sparker' (se l'engagement rate è alto)
        *   'Insightful Analyst' (se l'utente condivide dati/analisi)
        *   'Visual Communicator' (se i tweet con immagini/video sono forti)
        *   'Community Builder' (se ci sono molte interazioni/risposte)

Per favore, formatta il report in Markdown chiaro e conciso, usando titoli e liste per facilitare la lettura.
Evita di dare consigli generici non supportati dai dati forniti.
Concentrati sull'analisi del CSV e su cosa rivela specificamente per questo utente/account.
`;
}

// Esempio di come potresti usare questo prompt con la SDK di OpenAI (da eseguire lato server):
// async function getGptReport(csvData: string, handle?: string) {
//   if (!process.env.OPENAI_API_KEY) {
//     throw new Error('OPENAI_API_KEY is not set in environment variables.');
//   }
//   const prompt = SocialGrowthGPT(csvData, handle);
//   try {
//     const completion = await openai.chat.completions.create({
//       model: 'gpt-4o', // o gpt-4-turbo, o il modello che preferisci
//       messages: [
//         { role: 'system', content: 'Sei un esperto analista di social media specializzato nella crescita di account X (Twitter). Il tuo compito è analizzare i dati dei tweet forniti e offrire insight utili e attuabili.' },
//         { role: 'user', content: prompt }
//       ],
//       temperature: 0.5, // Un valore più basso per risposte più fattuali e meno 'creative'
//       // max_tokens: 2000, // Imposta un limite se necessario
//     });
//     return completion.choices[0]?.message?.content;
//   } catch (error) {
//     console.error('Error calling OpenAI API:', error);
//     throw error;
//   }
// } 