export default async (req, res) => {
    // 1. Get the user's resume text from the webpage
    const { resume } = JSON.parse(req.body);
    
    // 2. Call OpenAI (GPT-3.5-turbo)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: "Generate a professional cover letter based on this resume:"
        }, {
          role: "user",
          content: resume
        }]
      })
    });
    
    // 3. Send the AI response back to the webpage
    const data = await response.json();
    res.status(200).json({ 
      coverLetter: data.choices[0].message.content 
    });
  };