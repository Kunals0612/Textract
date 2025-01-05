import os
from groq import Groq
client = Groq(
    api_key="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",
)
question = input("Enter Question")
fileContent = "Last Updated on January 12th, 2024\nKunal Shinde\n§ github.com/kunals0612 Ð Leetcode ï linkedin.com/in/KunalS # kunalshinde0612@gmail.com\nEducation\nPune Institute of Computer Technology\nJune 2026\nBachelor of Computer Technology\nCurrent GPA: 8.75/10\nVidya Valley North Point Jr College\nJune 2022\nHSC\nPercentage: 79.5/100\nSkills\nLanguages: C++, Python(Intermediate), Java(Intermediate), JavaScript(Intermediate), HTML/CSS, SQL\nFrameWork: Node.js, React.js, Next.js, express.js\nTools: Git/GitHub, Figma, Fusion360, Tableau, VS Code, Postman\nProjects\nAgroSense | Embedded C++, Flask, Machine Learning, Next.js\nMay. 2024\n• Developed an ML-powered platform to analyze real-time soil sensor data and recommend fertilizers.\n• Achieved a 85% increase in prediction accuracy through iterative model optimization.\n• Built a Next.js interface to visualize soil data and integrate historical insights for adaptive learning.\nThreatCast | Tableau, MySQL, Beautiful-soup, Machine Learning\nApril. 2024\n• Designed a cyber threat forecasting tool for the Barclays Hack-O-Hire Hackathon 2024.\n• Analyzed data trends using Beautiful Soup and visualized insights in Tableau dashboards.\n• Optimized prediction accuracy by 80%, improving decision-making for cyber defenses.\nCompressiON | Java, Socket-Programming, Multi-Threading\nMay. 2024\n• Created an HTTP server supporting gzip compression with dynamic responses to client requests.\n• Implemented multi-threading to enhance scalability and handle [number] concurrent connections.\nAchievements and Certifications\nFinalist (Barclays Hack-O-Hire)\nApril. 2024\nA 24-Hours Hackathon arranged by Barclays India in pune campus. We were finalist from 1200+ teams\nComplete Web Development BootCamp 2024\nJuly. 2024\nThe Complete Web Development With Angela Yu Certification offered after completion of Web Development Course\nRoles and Responsibilities\nPICT Robotics (Technical Team Member)\nMay.2023 - Sep.2024\n• Gained hands-on experience in robot design and development.\n• Participated in the Robocon International Competition twice.\n• Designed and built competitive robots focusing on innovation, functionality, and performance.\nPICT Robotics (Robotics Design Lead)\nSep.2024\n• Spearheaded design of robotics systems for Robocon25, ensuring integration and innovation.\n• Led 15-member team in creating efficient and cost-effective prototypes.\n• Collaborated with teams to ensure seamless functionality and innovation in robotics.\n"
chatCompletion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": f"{fileContent} Based on above text {question}",
        }
    ],
    model = "llama-3.3-70b-versatile",
)
print(chatCompletion.choices[0].message.content)