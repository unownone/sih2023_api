# Sih 23 API

### Current Features:

- [x] Base API to scrape data on demand [GET] `https://sih.ikr.one/`

### Planned Features:

- [ ] Telegram bot to get data on demand

  - [ ] Similarity Search
  - [ ] GPT Integration
  - [ ] Watching Problem Statements (Per Account Async updates)

- [ ] Web App to get data on demand
  - [ ] Similarity Search
  - [ ] GPT Integration
  - [ ] Watching Problem Statements (Per Account Async updates)

### Feature Definition:

- JSON API
  Api that returns all the data in JSON format

```json
[
  {
    "id": 1516,
    "ps_code": "SIH1516",
    "title": "Suggest an Al-based solution to enable ease of grievance lodging and tracking for\ncitizens across multiple departments",
    "description": "A robust grievance redressal mechanism is a crucial component of any administration. An efficient and effective procedure for addresstng grievances demonstrates an administration's accountability responsiveness, and user-friendliness. However, the ease of lodging a complaint or grievance by citizens is often lacking in many lndian cities. Given the large migratory population in tndian cities, consisting of individuals who may not be familiar with English, Hindi, or the local regional language, citizens face challenges in lodging their grievances. Moreover, the process of lodging a gflevance is not always straightforward. Some department websites are inaccessible, and locating the correct website for a specific department can be difficult. lntroducing an Al-based chatbot that allows citizens to dictate their grievances in their local language and lodge them, would greatly assist citizens. This tool should be able to understand and process complaints effectively, assign them to the relevant department, and provide citizens with a unique complaint number. Real-time updates on the status of the complaint should be sent to citizens, enabling one-on-one conversations throughout the grievance lifecycle. The primary objective of this solution should be to provide citizens with an easy-to_use chatbot that facilitates efficient lodging and tracking of grievances. This would not only save citizens' time in searching for the appropriate department or category but also enabl; the administration to receive targeted grievances and enhance overall service delivery.",
    "org": "Ministry of Housing and Urban Affairs",
    "category": "Software",
    "domain": "Smart Automation",
    "submissions": 0
  }
]
```

- Similarity Search
  Returns a list of problem statements similar to query

```text
qs:
\search AI/ML
response:
10 Problem Statements with "AI/ML"
1. PS1 - def - title - submissions
2. PS2 - def - title - submissions
...
```

- GPT Integration
  Passes problem statement(s) to GPT to help generate solutions

```text
qs:
\qs For PS23 what should be a good solution?
response:
For solving PS23 one can do xyz
```

```text
qs:
\qs What ideas are best for my team , my team has 2 web developers , 4 android developers and 1 ML mentor
response:
With the current configuration you should go for problem statements:
PS23 - def - title - submissions - Reason
PS53 - def - title - submissions - Reason
PS095 - def - title - submissions - Reason
```

- Watching Problem Statements
  Allows users/email id to watch problem statements and get updates (via email or telegram)
  Updates will be about: new submissions, selected teams , etc.

```text
qs: /subscribe PS21 PS43 PS584
response: Subscribed to PS21, PS43, PS584
```

```text
response: 2 New Submissions on PS43
response: Shortlisted teams declared for PS584
```
