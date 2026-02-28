import { useState, useMemo } from "react";

const SOURCES = [
  { id: "niche", name: "Niche.com", url: "https://www.niche.com", desc: "Grades, rankings, demographics, reviews (2025-26)" },
  { id: "gs", name: "GreatSchools.org", url: "https://www.greatschools.org", desc: "Ratings 1-10, equity data, test scores" },
  { id: "sd", name: "SchoolDigger.com", url: "https://www.schooldigger.com", desc: "State rankings, proficiency trends" },
  { id: "usnews", name: "U.S. News Education", url: "https://www.usnews.com/education/k12", desc: "Rankings, proficiency, student-teacher ratios" },
  { id: "ncdpi", name: "NC Dept of Public Instruction", url: "https://www.dpi.nc.gov", desc: "Official EOG test scores (2023-24)" },
  { id: "psr", name: "PublicSchoolReview.com", url: "https://www.publicschoolreview.com", desc: "Diversity indices, enrollment, spending" },
  { id: "pvsr", name: "PrivateSchoolReview.com", url: "https://www.privateschoolreview.com", desc: "Private school tuition, acceptance rates" },
  { id: "wcpss", name: "WCPSS Assignment Lookup", url: "https://osageo.wcpss.net/assignment-lookup/", desc: "Official base school assignment tool" },
];

const SCHOOLS = [
  {
    name: "Oak Grove Elementary",
    type: "Public",
    grades: "PK-5",
    address: "10401 Penny Road, Raleigh, NC 27606",
    yourZoned: true,
    distance: "3.5 mi from your address",
    students: 553, studentTeacherRatio: 13, mathProficiency: 61, readingProficiency: 61,
    nicheGrade: "A-", greatSchoolsRating: 6, tuition: 0, diversityIndex: 0.64,
    asianPct: 7.0, hispanicPct: 21.0, whitePct: 53.0, blackPct: 16.0, multiracialPct: 3.0,
    economicDisadvantaged: 32, giftedProgram: true, calendar: "Year-Round",
    stateRank: "#581 of 2,617 elementary schools in NC (top 30%)",
    schoolPath: "Lufkin Road Middle (year-round), then Felton Grove High",
    specialPrograms: "AIG/Gifted & Talented, ESL",
    notes: "Your base-assigned elementary school per WCPSS (confirmed Feb 2026). Year-round calendar. 61% math and reading proficiency, above state average. Student-teacher ratio of 13:1 is better than the NC average of 15:1. Diverse student body with 45% minority enrollment. 32% economically disadvantaged. SchoolDigger 4-star rating. School has become notably more diverse over the past decade.",
    sentimentScore: 72,
    sentimentSummary: "Generally positive. Parents note good teachers and small school feel. Some concerns about older facilities. School has declined in enrollment over 5 years but maintains solid academics.",
    sentimentSources: "Niche (A-, 3.8/5), GreatSchools (6/10), SchoolDigger (4-star)",
    ncGrade: "B", ncScore: 67, growthStatus: "Meets Expected Growth",
    collegePrepScore: null, satAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "N/A (elementary)",
    collegePrepScore: null, satAvg: null, actAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "N/A (elementary school)",
    sourceLinks: { niche: "https://www.niche.com/k12/oak-grove-elementary-school-raleigh-nc/", gs: "https://www.greatschools.org/north-carolina/raleigh/1888-Oak-Grove-Elementary/", usnews: "https://www.usnews.com/education/k12/north-carolina/oak-grove-elementary-220300", psr: "https://www.publicschoolreview.com/oak-grove-elementary-school-profile/27606" },
  },
  {
    name: "Holly Springs Elementary",
    type: "Public",
    grades: "PK-5",
    address: "401 Holly Springs Rd, Holly Springs, NC 27540",
    yourZoned: false,
    distance: "3.2 mi from your address",
    students: 907, studentTeacherRatio: 14, mathProficiency: 83, readingProficiency: 80,
    nicheGrade: "A", greatSchoolsRating: 9, tuition: 0, diversityIndex: 0.65,
    asianPct: 12.9, hispanicPct: 14.1, whitePct: 57.4, blackPct: 8.5, multiracialPct: 7.1,
    economicDisadvantaged: 17, giftedProgram: true, calendar: "Traditional",
    stateRank: "#37 of 1,445 elementary schools in NC",
    schoolPath: "Lufkin Road Middle (yr-round) or Holly Ridge Middle (traditional), then Holly Springs High",
    specialPrograms: "AIG/Gifted, ESL, Single Subject Acceleration Math",
    notes: "Your base-assigned elementary school per WCPSS. Diverse student body with the highest Asian representation in the area (12.9%). Strong math/reading scores. The Single Subject Acceleration Math program aligns grade-level math periods so students can advance without missing other subjects. Top 3% statewide.",
    sentimentScore: 82,
    sentimentSummary: "Mostly positive. Parents highlight teacher quality, safety, and welcoming environment. Some concerns about front office communication and large school size. Multiple parents moving from out of state praise it as superior to previous schools.",
    sentimentSources: "Niche (A, 4.0/5), GreatSchools (9/10), Movoto (18 reviews, 3.5 avg)",
    ncGrade: "A", ncScore: 86, growthStatus: "Meets Expected Growth",
    collegePrepScore: null, satAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "N/A (elementary)",
    collegePrepScore: null, satAvg: null, actAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "N/A (elementary school)",
    sourceLinks: { niche: "https://www.niche.com/k12/holly-springs-elementary-school-holly-springs-nc/", gs: "https://www.greatschools.org/north-carolina/holly-springs/1967-Holly-Springs-Elementary/", usnews: "https://www.usnews.com/education/k12/north-carolina/holly-springs-elementary-216410" },
  },
  {
    name: "Holly Grove Elementary",
    type: "Public",
    grades: "PK-5",
    address: "1451 Avent Ferry Rd, Holly Springs, NC 27540",
    yourZoned: false, distance: "4.1 mi",
    students: 897, studentTeacherRatio: 14, mathProficiency: 88, readingProficiency: 80,
    nicheGrade: "A", greatSchoolsRating: 8, tuition: 0, diversityIndex: 0.58,
    asianPct: 10.2, hispanicPct: 11.5, whitePct: 63.0, blackPct: 8.0, multiracialPct: 7.3,
    economicDisadvantaged: 14, giftedProgram: true, calendar: "Traditional",
    stateRank: "#55 of 1,445 (capped 2025-26)",
    schoolPath: "Holly Grove Middle, then Holly Springs High",
    specialPrograms: "AIG/Gifted, STEM activities",
    notes: "Highest math proficiency in the area at 88%. Currently capped for 2025-26 (overcrowded). Some students reassigned to Rex Road Elementary. Not your zoned school but worth monitoring if boundaries shift.",
    sentimentScore: 85,
    sentimentSummary: "Very positive. Parents praise caring teachers, strong academics, and well-managed environment despite large size. Few negative reviews.",
    sentimentSources: "Niche (A, 2 reviews), GreatSchools (8/10), SchoolDigger (5-star)",
    ncGrade: "A", ncScore: 88, growthStatus: "Exceeds Expected Growth",
    collegePrepScore: null, satAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "N/A (elementary)",
    collegePrepScore: null, satAvg: null, actAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "N/A (elementary school)",
    sourceLinks: { niche: "https://www.niche.com/k12/holly-grove-elementary-school-holly-springs-nc/" },
  },
  {
    name: "Holly Ridge Elementary",
    type: "Public",
    grades: "PK-5",
    address: "900 Holly Springs Rd, Holly Springs, NC 27540",
    yourZoned: false, distance: "3.8 mi",
    students: 751, studentTeacherRatio: 14, mathProficiency: 84, readingProficiency: 75,
    nicheGrade: "A", greatSchoolsRating: 8, tuition: 0, diversityIndex: 0.52,
    asianPct: 8.0, hispanicPct: 9.5, whitePct: 68.0, blackPct: 7.5, multiracialPct: 7.0,
    economicDisadvantaged: 16, giftedProgram: true, calendar: "Traditional",
    stateRank: "#61 of 1,445 (capped 2025-26)",
    schoolPath: "Holly Ridge Middle, then Holly Springs High",
    specialPrograms: "AIG/Gifted, Safety Patrol, Reading Competitions",
    notes: "Also capped for 2025-26. Active parent community with frequent field trips. Some Holly Springs Elementary students may be reassigned here per 2025-26 plan. Top 5% statewide.",
    sentimentScore: 88,
    sentimentSummary: "Highly positive. Parents love field trips, teacher relationships, and strong community feel. Highest parent satisfaction among area schools.",
    sentimentSources: "Niche (A, 5/5), GreatSchools (8/10), SchoolDigger (5-star, top 4.3%)",
    ncGrade: "A", ncScore: 84, growthStatus: "Meets Expected Growth",
    collegePrepScore: null, satAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "N/A (elementary)",
    collegePrepScore: null, satAvg: null, actAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "N/A (elementary school)",
    sourceLinks: { niche: "https://www.niche.com/k12/holly-ridge-elementary-school-holly-springs-nc/", sd: "https://www.schooldigger.com/go/NC/schools/0472002683/school.aspx" },
  },
  {
    name: "Rex Road Elementary (New 2025)",
    type: "Public (New)",
    grades: "K-5",
    address: "6125 Rex Road, Holly Springs, NC 27540",
    yourZoned: false, distance: "5.0 mi (est.)",
    students: 800, studentTeacherRatio: 15, mathProficiency: null, readingProficiency: null,
    nicheGrade: "N/A (new)", greatSchoolsRating: null, tuition: 0, diversityIndex: 0.60,
    asianPct: 10.0, hispanicPct: 12.0, whitePct: 60.0, blackPct: 10.0, multiracialPct: 8.0,
    economicDisadvantaged: null, giftedProgram: true, calendar: "Year-Round (Multi-Track)",
    stateRank: "New school, no data yet",
    schoolPath: "TBD middle school, then Holly Springs High",
    specialPrograms: "AIG/Gifted (expected), Modern learning commons",
    notes: "Brand new 133,000 sq ft school opened July 2025. Receives students from capped Buckhorn Creek and Holly Grove. Year-round multi-track calendar. No test data yet. Demographics estimated from feeder zones.",
    sentimentScore: 70,
    sentimentSummary: "No parent reviews yet (opened July 2025). Community excitement about new facilities. Score is neutral baseline pending reviews.",
    sentimentSources: "WCPSS website, School Construction News (Dec 2025)",
    ncGrade: "N/A", ncScore: null, growthStatus: "New school — no data yet",
    collegePrepScore: null, satAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "N/A (elementary)",
    collegePrepScore: null, satAvg: null, actAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "N/A (elementary school)",
    sourceLinks: { wcpss: "https://nc01911451.schoolwires.net/rexroades" },
  },
  {
    name: "Lufkin Road Middle",
    type: "Public (Middle)",
    grades: "6-8",
    address: "1002 Lufkin Road, Apex, NC 27539",
    yourZoned: true, distance: "2.1 mi from your address",
    students: 957, studentTeacherRatio: 15, mathProficiency: 65, readingProficiency: 70,
    nicheGrade: "A", greatSchoolsRating: 10, tuition: 0, diversityIndex: 0.62,
    asianPct: 11.0, hispanicPct: 13.0, whitePct: 58.0, blackPct: 10.0, multiracialPct: 8.0,
    economicDisadvantaged: 30, giftedProgram: true, calendar: "Year-Round",
    stateRank: "#89 in NC (U.S. News), #200 SchoolDigger",
    schoolPath: "Feeds into Apex High School",
    specialPrograms: "AIG/Gifted, Clubs, Sports, Algebra readiness",
    notes: "Your likely base middle school. Year-round calendar. GS 10/10, Niche A. Student growth 89th percentile (92.7/100). Located on Lufkin Road, very close to Lily Orchard. 30% economically disadvantaged.",
    sentimentScore: 65,
    sentimentSummary: "Polarized. Official ratings are very high (GS 10/10, Niche A). However, student reviews on Niche cite bullying, poor facility conditions, and restrictive policies. Some parents praise the learning environment.",
    sentimentSources: "Niche (A, 3.2/5, 5 reviews), GreatSchools (10/10), SchoolDigger (4-star), U.S. News (#89)",
    ncGrade: "B", ncScore: 72, growthStatus: "Meets Expected Growth",
    collegePrepScore: null, satAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "N/A (middle school)",
    collegePrepScore: null, satAvg: null, actAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "N/A (middle school)",
    sourceLinks: { niche: "https://www.niche.com/k12/lufkin-road-middle-school-apex-nc/", gs: "https://www.greatschools.org/north-carolina/apex/2796-Lufkin-Road-Middle/", usnews: "https://www.usnews.com/education/k12/north-carolina/lufkin-road-middle-265363", sd: "https://www.schooldigger.com/go/NC/schools/0472002490/school.aspx" },
  },
  {
    name: "Holly Springs High",
    type: "Public (High)",
    grades: "9-12",
    address: "5329 Cass Holt Rd, Holly Springs, NC 27540",
    yourZoned: false, distance: "4.5 mi",
    students: 2200, studentTeacherRatio: 16, mathProficiency: 55, readingProficiency: 72,
    nicheGrade: "A", greatSchoolsRating: 7, tuition: 0, diversityIndex: 0.66,
    asianPct: 10.0, hispanicPct: 14.0, whitePct: 55.0, blackPct: 12.0, multiracialPct: 9.0,
    economicDisadvantaged: 20, giftedProgram: true, calendar: "Traditional",
    stateRank: "Top 20% of NC high schools",
    schoolPath: "Your zoned high school (unless reassigned to Felton Grove)",
    specialPrograms: "AP courses, STEM, CTE, Sports, Arts",
    notes: "Your current base high school. Previous principal moved to new Felton Grove High. The 2025-26 reassignment may shift some feeder areas. Diverse student body. Solid AP and extracurricular offerings.",
    sentimentScore: 72,
    sentimentSummary: "Generally positive. Parents appreciate diversity and extracurriculars. Some reviews mention growing class sizes due to population boom. Sports and arts well regarded.",
    sentimentSources: "Niche (A, 7 reviews), GreatSchools (7/10)",
    ncGrade: "B", ncScore: 78, growthStatus: "Meets Expected Growth",
    collegePrepScore: 72, satAvg: 1134, gradRate: 98, apParticipation: 69, collegeEnrollRate: 85, notableColleges: "UNC Chapel Hill, NC State, Wake Tech dual enrollment; 3 College Success Awards",
    collegePrepScore: 72, satAvg: 1134, actAvg: 27, gradRate: 98, apParticipation: 69, collegeEnrollRate: 85, notableColleges: "UNC Chapel Hill, NC State, Wake Tech dual enrollment; 3 College Success Awards since 2018-19",
    sourceLinks: { niche: "https://www.niche.com/k12/holly-springs-high-school-holly-springs-nc/" },
  },
  {
    name: "Felton Grove High (New 2025)",
    type: "Public (High, New)",
    grades: "9-10 (expanding to 9-12)",
    address: "8550 Stephenson Road, Apex, NC 27539",
    yourZoned: true, distance: "1.5 mi from your address",
    students: 450, studentTeacherRatio: 15, mathProficiency: null, readingProficiency: null,
    nicheGrade: "N/A (new)", greatSchoolsRating: null, tuition: 0, diversityIndex: 0.65,
    asianPct: 10.0, hispanicPct: 13.0, whitePct: 57.0, blackPct: 12.0, multiracialPct: 8.0,
    economicDisadvantaged: null, giftedProgram: true, calendar: "Traditional",
    stateRank: "New school, no data yet",
    schoolPath: "Opening with 9th-10th, expanding yearly to full 9-12",
    specialPrograms: "Modern facilities, designed for 2,200+ at capacity",
    notes: "Opened August 2025 on Stephenson Road, only 1.5 miles from Lily Orchard. Currently 9th-10th only. Your child entering K in 2027 would reach HS around 2036 when fully operational. Named after historic Felton Grove community.",
    sentimentScore: 72,
    sentimentSummary: "No reviews yet (opened Aug 2025). Community excitement about modern facilities and proximity. Score is neutral baseline pending reviews.",
    sentimentSources: "CBS17, WRAL, WCPSS enrollment proposal",
    ncGrade: "N/A", ncScore: null, growthStatus: "New school — no data yet",
    collegePrepScore: null, satAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "No graduates yet (opened Aug 2025). AP Capstone Program offered.",
    collegePrepScore: null, satAvg: null, actAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "No data yet (opened Aug 2025, no graduates). AP Capstone Program offered.",
    sourceLinks: { wcpss: "https://www.wcpss.net/Page/58487" },
  },
  {
    name: "Pine Springs Preparatory Academy",
    type: "Charter (Free)",
    grades: "K-8",
    address: "220 Rosewood Centre Dr, Holly Springs, NC 27540",
    yourZoned: false, distance: "5.2 mi",
    students: 1268, studentTeacherRatio: 17, mathProficiency: 66, readingProficiency: 71,
    nicheGrade: "A", greatSchoolsRating: 5, tuition: 0, diversityIndex: 0.47,
    asianPct: 9.0, hispanicPct: 7.0, whitePct: 72.0, blackPct: 4.0, multiracialPct: 8.0,
    economicDisadvantaged: 1, giftedProgram: false, calendar: "Traditional",
    stateRank: "Top 20% Elem, Top 15% Middle",
    schoolPath: "K-8 on campus, no middle school transition",
    specialPrograms: "Core Knowledge, Singapore Math, Blended/Virtual options",
    notes: "K-8 continuity avoids middle school transition. Singapore Math. Lottery admission (Jan-Feb). Lower diversity index (0.47 vs 0.71 state avg). Only 59% licensed teachers per U.S. News. Free as public charter.",
    sentimentScore: 68,
    sentimentSummary: "Polarized. Niche A but GS only 5/10. Parent reviews flag diversity and inclusivity concerns. Multiple reviews mention racial climate issues for minority families.",
    sentimentSources: "Niche (A, 4.2/5, 6 reviews), GreatSchools (5/10)",
    ncGrade: "B", ncScore: 73, growthStatus: "Meets Expected Growth",
    collegePrepScore: null, satAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "N/A (K-8 school)",
    collegePrepScore: null, satAvg: null, actAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "N/A (K-8 school, no high school graduates)",
    sourceLinks: { niche: "https://www.niche.com/k12/pine-springs-preparatory-academy-holly-springs-nc/", psr: "https://www.publicschoolreview.com/pine-springs-preparatory-academy-profile" },
  },
  {
    name: "Thales Academy Holly Springs",
    type: "Private",
    grades: "PK-10 (expanding to 12)",
    address: "11244 Holly Springs New Hill Rd, Holly Springs, NC 27540",
    yourZoned: false, distance: "4.8 mi",
    students: 732, studentTeacherRatio: 14, mathProficiency: null, readingProficiency: null,
    nicheGrade: "A", greatSchoolsRating: null, tuition: 7000, diversityIndex: 0.35,
    asianPct: 6.0, hispanicPct: 5.0, whitePct: 78.0, blackPct: 4.0, multiracialPct: 7.0,
    economicDisadvantaged: null, giftedProgram: false, calendar: "Traditional",
    stateRank: "N/A (Private)",
    schoolPath: "K-10 on campus, expanding to K-12",
    specialPrograms: "Direct Instruction, Classical Curriculum, Latin, Character Education",
    notes: "Affordable private at $7K/year. Classical curriculum with Latin. Reviews note bias concerns for minority students. 78% white. Lowest diversity index (0.35).",
    sentimentScore: 62,
    sentimentSummary: "Mixed. Strong positives on academics and affordability. Multiple reviews flag lack of diversity, bias toward minority students, and bullying. One student cited ethnic bias.",
    sentimentSources: "Niche (A, 3.8/5, 14 reviews), Movoto, PrivateSchoolReview",
    ncGrade: "N/A", ncScore: null, growthStatus: "Private — not graded by NCDPI",
    collegePrepScore: null, satAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "N/A (currently PK-10, expanding)",
    collegePrepScore: null, satAvg: null, actAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "N/A (currently PK-10, expanding to 12)",
    sourceLinks: { niche: "https://www.niche.com/k12/thales-academy-holly-springs-holly-springs-nc/", pvsr: "https://www.privateschoolreview.com/thales-academy-holly-springs-pre-k-5-profile" },
  },
  {
    name: "New School Montessori Center",
    type: "Private (Montessori)",
    grades: "Infant through 8th",
    address: "5617 Sunset Lake Rd, Holly Springs, NC 27540",
    yourZoned: false, distance: "2.8 mi",
    students: 259, studentTeacherRatio: 8, mathProficiency: null, readingProficiency: null,
    nicheGrade: "B+", greatSchoolsRating: null, tuition: 12000, diversityIndex: 0.55,
    asianPct: 12.0, hispanicPct: 8.0, whitePct: 60.0, blackPct: 10.0, multiracialPct: 10.0,
    economicDisadvantaged: null, giftedProgram: false, calendar: "Traditional",
    stateRank: "N/A (Private)",
    schoolPath: "Through 8th grade on campus",
    specialPrograms: "Montessori Method, Mixed-age classrooms, Self-directed learning",
    notes: "Established 1984. Best ratio at 8:1. Child-led learning. Higher tuition but small nurturing environment. 12% Asian. 90% acceptance. Close to your address on Sunset Lake Rd.",
    sentimentScore: 76,
    sentimentSummary: "Positive but limited reviews. Long-established with loyal parent base. Small community feel valued.",
    sentimentSources: "Niche (B+), PrivateSchoolReview (90% acceptance), Yelp",
    ncGrade: "N/A", ncScore: null, growthStatus: "Private — not graded by NCDPI",
    collegePrepScore: null, satAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "N/A (through 8th grade)",
    collegePrepScore: null, satAvg: null, actAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "N/A (through 8th grade only)",
    sourceLinks: { niche: "https://www.niche.com/k12/new-school-montessori-center-holly-springs-nc/", pvsr: "https://www.privateschoolreview.com/new-school-montessori-center-profile" },
  },
  {
    name: "Peak Charter Academy",
    type: "Charter (Free)",
    grades: "K-8",
    address: "3800 Weddington Rd, Apex, NC 27539",
    yourZoned: false, distance: "3.8 mi",
    students: 775, studentTeacherRatio: 23, mathProficiency: 84, readingProficiency: 83,
    nicheGrade: "A+", greatSchoolsRating: 9, tuition: 0, diversityIndex: 0.72,
    asianPct: 44.0, hispanicPct: 5.0, whitePct: 28.0, blackPct: 8.0, multiracialPct: 15.0,
    economicDisadvantaged: 19, giftedProgram: true, calendar: "Traditional",
    stateRank: "#45 Elem / #9 Middle in NC (Niche)",
    schoolPath: "K-8 on campus, no middle school transition needed",
    specialPrograms: "AIG/Gifted, STEM focus, Character Education, Lottery admission",
    notes: "Top-rated charter in Apex, only 3.8 mi away. Highest Asian representation of any area school at 44%. Niche A+ with strong academics (84% math, 83% reading). K-8 continuity avoids middle school transition. Lottery admission (apply Jan-Feb). High diversity index of 0.72. Student-teacher ratio of 23:1 is higher than average.",
    sentimentScore: 80,
    sentimentSummary: "Very positive. Parents praise academic rigor, STEM focus, and diverse community. Some note larger class sizes. Highly sought after with lottery waitlists.",
    sentimentSources: "Niche (A+, 4.3/5), GreatSchools (9/10)",
    ncGrade: "B", ncScore: 85, growthStatus: "Exceeds Expected Growth",
    collegePrepScore: null, satAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "N/A (K-8 school)",
    collegePrepScore: null, satAvg: null, actAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "N/A (K-8 school, no high school graduates)",
    sourceLinks: { niche: "https://www.niche.com/k12/peak-charter-academy-apex-nc/", gs: "https://www.greatschools.org/north-carolina/apex/5583-Peak-Charter-Academy/", psr: "https://www.publicschoolreview.com/peak-charter-academy-profile" },
  },
  {
    name: "Triangle Math & Science Academy (TMSA)",
    type: "Charter (Free)",
    grades: "K-12",
    address: "312 Gregson Dr, Cary, NC 27511",
    yourZoned: false, distance: "12 mi",
    students: 1341, studentTeacherRatio: 17, mathProficiency: 82, readingProficiency: 86,
    nicheGrade: "A", greatSchoolsRating: 10, tuition: 0, diversityIndex: 0.69,
    asianPct: 47.0, hispanicPct: 5.0, whitePct: 25.0, blackPct: 10.0, multiracialPct: 13.0,
    economicDisadvantaged: 15, giftedProgram: true, calendar: "Traditional",
    stateRank: "U.S. News #614 nationally, GS 10/10",
    schoolPath: "K-12 on campus, full continuity through high school graduation",
    specialPrograms: "STEM focus, AP courses, 100% graduation rate, SAT avg 1370, Lottery admission",
    notes: "Full K-12 charter with outstanding outcomes. Highest Asian enrollment at 47%. GS 10/10 and U.S. News nationally ranked. 100% graduation rate with 1370 avg SAT. 12 miles away in Cary but worth the commute for K-12 continuity. Lottery admission (apply Jan-Feb).",
    sentimentScore: 82,
    sentimentSummary: "Highly positive. Parents highlight academic excellence, college prep, and diverse STEM community. Strong college placement outcomes. Some note longer commute from Apex area.",
    sentimentSources: "Niche (A, 4.1/5), GreatSchools (10/10), U.S. News (#614)",
    ncGrade: "A", ncScore: 93, growthStatus: "Exceeds Expected Growth",
    collegePrepScore: 92, satAvg: 1370, gradRate: 100, apParticipation: 88, collegeEnrollRate: 98, notableColleges: "86 of top 100 colleges: Harvard, Yale, Princeton; 193 at UNC-CH; 21 AP courses",
    collegePrepScore: 92, satAvg: 1370, actAvg: 29, gradRate: 100, apParticipation: 88, collegeEnrollRate: 98, notableColleges: "Acceptances to 86 of top 100 colleges incl. Harvard, Yale, Princeton; 193 students at UNC Chapel Hill; 21 AP courses",
    sourceLinks: { niche: "https://www.niche.com/k12/triangle-math-and-science-academy-cary-nc/", gs: "https://www.greatschools.org/north-carolina/cary/5573-Triangle-Math-And-Science-Academy/", usnews: "https://www.usnews.com/education/best-high-schools/north-carolina/districts/triangle-math-and-science-academy/triangle-math-and-science-academy-high-14482" },
  },
  {
    name: "Cardinal Charter Academy",
    type: "Charter (Free)",
    grades: "K-8",
    address: "2320 SW Cary Pkwy, Cary, NC 27513",
    yourZoned: false, distance: "13 mi",
    students: 720, studentTeacherRatio: 25, mathProficiency: 59, readingProficiency: 61,
    nicheGrade: "A-", greatSchoolsRating: 7, tuition: 0, diversityIndex: 0.77,
    asianPct: 14.0, hispanicPct: 20.0, whitePct: 29.0, blackPct: 30.0, multiracialPct: 6.0,
    economicDisadvantaged: 41, giftedProgram: false, calendar: "Traditional",
    stateRank: "Niche A-, GS 7/10",
    schoolPath: "K-8 on campus, no middle school transition needed",
    specialPrograms: "Core Knowledge curriculum, Character education, Lottery admission",
    notes: "Most diverse school on this list with 0.77 diversity index. Highest Black enrollment (30%) and significant Hispanic representation (20%). K-8 continuity. 41% economically disadvantaged — serving a broad community. Academics are moderate (59% math, 61% reading). 25:1 student-teacher ratio is higher than average.",
    sentimentScore: 65,
    sentimentSummary: "Mixed. Parents appreciate diversity and community feel. Some concerns about academic rigor and larger class sizes. GS 7/10 suggests solid but not top-tier performance.",
    sentimentSources: "Niche (A-, 3.5/5), GreatSchools (7/10)",
    ncGrade: "B", ncScore: 63, growthStatus: "Meets Expected Growth",
    collegePrepScore: null, satAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "N/A (K-8 school)",
    collegePrepScore: null, satAvg: null, actAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "N/A (K-8 school, no high school graduates)",
    sourceLinks: { niche: "https://www.niche.com/k12/cardinal-charter-academy-cary-nc/", gs: "https://www.greatschools.org/north-carolina/cary/5582-Cardinal-Charter-Academy/", psr: "https://www.publicschoolreview.com/cardinal-charter-academy-profile" },
  },
  {
    name: "Southern Wake Academy",
    type: "Charter (Free)",
    grades: "6-12",
    address: "700 S Main St, Holly Springs, NC 27540",
    yourZoned: false, distance: "5.5 mi",
    students: 553, studentTeacherRatio: 13, mathProficiency: 38, readingProficiency: 49,
    nicheGrade: "C", greatSchoolsRating: 3, tuition: 0, diversityIndex: 0.45,
    asianPct: 2.0, hispanicPct: 8.0, whitePct: 71.0, blackPct: 9.0, multiracialPct: 10.0,
    economicDisadvantaged: 30, giftedProgram: false, calendar: "Traditional",
    stateRank: "Below average — Niche C, GS 3/10",
    schoolPath: "6-12 on campus, continuity through high school",
    specialPrograms: "Smaller school environment, Character education, Lottery admission",
    notes: "Nearby charter in Holly Springs but significantly lower academic performance (38% math, 49% reading). Niche C grade and GS 3/10. Best student-teacher ratio among charters at 13:1. Low diversity (71% white, 2% Asian). 70-74% graduation rate is well below state average. Included for completeness.",
    sentimentScore: 45,
    sentimentSummary: "Negative to mixed. Low ratings across platforms. Some parents appreciate small school feel but academic outcomes are concerning. High staff turnover mentioned in reviews.",
    sentimentSources: "Niche (C, 2.5/5), GreatSchools (3/10)",
    ncGrade: "D", ncScore: 42, growthStatus: "Does Not Meet Expected Growth",
    collegePrepScore: 38, satAvg: 1140, gradRate: 74, apParticipation: 26, collegeEnrollRate: 65, notableColleges: "Limited AP offerings; 1 College Success Award (2020-21); grad rate below NC avg",
    collegePrepScore: 38, satAvg: 1140, actAvg: 25, gradRate: 74, apParticipation: 26, collegeEnrollRate: 65, notableColleges: "1 College Success Award (2020-21); limited AP offerings; graduation rate below state average",
    sourceLinks: { niche: "https://www.niche.com/k12/southern-wake-academy-holly-springs-nc/", gs: "https://www.greatschools.org/north-carolina/holly-springs/5609-Southern-Wake-Academy/" },
  },
  {
    name: "Cary Academy",
    type: "Private",
    grades: "6-12",
    address: "1500 N Harrison Ave, Cary, NC 27513",
    yourZoned: false, distance: "14 mi",
    students: 787, studentTeacherRatio: 8, mathProficiency: null, readingProficiency: null,
    nicheGrade: "A+", greatSchoolsRating: null, tuition: 32650, diversityIndex: 0.65,
    asianPct: 20.0, hispanicPct: 6.0, whitePct: 52.0, blackPct: 12.0, multiracialPct: 10.0,
    economicDisadvantaged: null, giftedProgram: true, calendar: "Traditional",
    stateRank: "#1 Private High School in NC (Niche)",
    schoolPath: "6-12 on campus, full middle-through-high continuity",
    specialPrograms: "AP courses, 1:1 Technology, STEM labs, Arts, 100% college acceptance, SAT avg 1440, ACT avg 32",
    notes: "Top-ranked private school in NC (#1 Niche). Elite academics with 1440 avg SAT and 100% graduation rate. Excellent 8:1 ratio. 20% Asian enrollment. Founded by SAS Institute. Tuition is $32,650/year — premium option. 14 miles in Cary. Admission is competitive with application process.",
    sentimentScore: 90,
    sentimentSummary: "Extremely positive. Parents and students rave about teacher quality, resources, college prep, and inclusive community. Consistently rated among best schools in NC.",
    sentimentSources: "Niche (A+, 4.5/5, 40+ reviews), U.S. News",
    ncGrade: "N/A", ncScore: null, growthStatus: "Private — not graded by NCDPI",
    collegePrepScore: 98, satAvg: 1440, gradRate: 100, apParticipation: 95, collegeEnrollRate: 100, notableColleges: "100% enroll: Duke, Columbia, Princeton, Stanford; 92% AP pass rate; 60 colleges",
    collegePrepScore: 98, satAvg: 1440, actAvg: 32, gradRate: 100, apParticipation: 95, collegeEnrollRate: 100, notableColleges: "100% college enrollment. Duke, Columbia, Princeton, Stanford; 92% AP pass rate; Class of 2025: 121 students to 60 colleges in 25 states",
    sourceLinks: { niche: "https://www.niche.com/k12/cary-academy-cary-nc/", pvsr: "https://www.privateschoolreview.com/cary-academy-profile" },
  },
  {
    name: "Thales Academy Apex",
    type: "Private",
    grades: "K-5",
    address: "1177 Ambergate Station, Apex, NC 27502",
    yourZoned: false, distance: "4.2 mi",
    students: 250, studentTeacherRatio: 14, mathProficiency: null, readingProficiency: null,
    nicheGrade: "A", greatSchoolsRating: null, tuition: 6725, diversityIndex: 0.38,
    asianPct: 8.0, hispanicPct: 5.0, whitePct: 75.0, blackPct: 5.0, multiracialPct: 7.0,
    economicDisadvantaged: null, giftedProgram: false, calendar: "Traditional",
    stateRank: "N/A (Private)",
    schoolPath: "Can continue to Thales Academy middle/high (expanding to 12)",
    specialPrograms: "Classical curriculum, Direct Instruction, Latin, Character Education, Singapore Math",
    notes: "Affordable private at $6,725/yr — one of the cheapest private options. Classical curriculum with Direct Instruction and Latin. Part of Thales Academy network. Located in Apex, close to home. Lower diversity (75% white). Separate campus from Holly Springs location.",
    sentimentScore: 70,
    sentimentSummary: "Positive on academics and affordability. Some concerns about diversity and class sizes. Parents appreciate structured classical approach.",
    sentimentSources: "Niche (A, 3.8/5), PrivateSchoolReview",
    ncGrade: "N/A", ncScore: null, growthStatus: "Private — not graded by NCDPI",
    collegePrepScore: null, satAvg: null, gradRate: null, apParticipation: null, collegeEnrollRate: null, notableColleges: "N/A (K-5 elementary only)",
    sourceLinks: { niche: "https://www.niche.com/k12/thales-academy-apex-apex-nc/", pvsr: "https://www.privateschoolreview.com/thales-academy-apex-profile" },
  },
  {
    name: "Cary Christian School",
    type: "Private (Christian)",
    grades: "K-12",
    address: "511 Walnut St, Cary, NC 27511",
    yourZoned: false, distance: "10 mi",
    students: 785, studentTeacherRatio: 12, mathProficiency: null, readingProficiency: null,
    nicheGrade: "A", greatSchoolsRating: null, tuition: 9981, diversityIndex: 0.45,
    asianPct: 8.0, hispanicPct: 6.0, whitePct: 72.0, blackPct: 7.0, multiracialPct: 7.0,
    economicDisadvantaged: null, giftedProgram: true, calendar: "Traditional",
    stateRank: "N/A (Private)",
    schoolPath: "K-12 on campus — full continuity through high school graduation",
    specialPrograms: "Classical Trivium (Grammar K-5, Logic 6-8, Rhetoric 9-12), ACCS accredited, AP courses, Athletics",
    notes: "Full K-12 classical Christian education. ACCS accredited. Strong college outcomes: avg SAT 1310, ACT 30, 100% graduation rate, GPA 3.77. Tuition $8,856 for K, $9,981 for grades 1-12. Classical Trivium approach. 10 miles in Cary but K-12 continuity is a major advantage.",
    sentimentScore: 78,
    sentimentSummary: "Very positive. Parents praise rigorous classical education, strong community, and college prep outcomes. Faith-based environment valued by families seeking that approach.",
    sentimentSources: "Niche (A, 4.2/5, 20+ reviews)",
    ncGrade: "N/A", ncScore: null, growthStatus: "Private — not graded by NCDPI",
    collegePrepScore: 80, satAvg: 1310, gradRate: 100, apParticipation: 60, collegeEnrollRate: 95, notableColleges: "Strong college placement; SAT 1310, ACT 30, 100% graduation, GPA 3.77",
    sourceLinks: { niche: "https://www.niche.com/k12/cary-christian-school-cary-nc/", pvsr: "https://www.privateschoolreview.com/cary-christian-school-profile" },
  },
  {
    name: "St. David's School",
    type: "Private (Episcopal)",
    grades: "PK-12",
    address: "3400 White Oak Rd, Raleigh, NC 27609",
    yourZoned: false, distance: "14 mi",
    students: 684, studentTeacherRatio: 7, mathProficiency: null, readingProficiency: null,
    nicheGrade: "A+", greatSchoolsRating: null, tuition: 28500, diversityIndex: 0.55,
    asianPct: 10.0, hispanicPct: 6.0, whitePct: 62.0, blackPct: 12.0, multiracialPct: 10.0,
    economicDisadvantaged: null, giftedProgram: true, calendar: "Traditional",
    stateRank: "N/A (Private) — Top 5 private school in NC",
    schoolPath: "PK-12 on campus — full continuity through high school graduation",
    specialPrograms: "College prep, STEM, Arts, 100% college placement, small class sizes, Episcopal tradition",
    notes: "Elite PK-12 school with 7:1 ratio (best among full-curriculum schools). Niche A+. 100% college placement. Episcopal tradition but welcomes all faiths. Tuition $27,900-$29,200. Premium option but exceptional quality. 14 miles in Raleigh.",
    sentimentScore: 88,
    sentimentSummary: "Extremely positive. Parents rave about small class sizes, teacher quality, inclusive community, and strong college outcomes. Consistently top-rated.",
    sentimentSources: "Niche (A+, 4.5/5, 30+ reviews)",
    ncGrade: "N/A", ncScore: null, growthStatus: "Private — not graded by NCDPI",
    collegePrepScore: 95, satAvg: 1400, gradRate: 100, apParticipation: 85, collegeEnrollRate: 100, notableColleges: "100% college placement; top universities nationwide; strong STEM and arts",
    sourceLinks: { niche: "https://www.niche.com/k12/st-davids-school-raleigh-nc/", pvsr: "https://www.privateschoolreview.com/st-davids-school-profile" },
  },
  {
    name: "Trinity Academy",
    type: "Private (Classical Christian)",
    grades: "PK-12",
    address: "10224 Baileywick Rd, Raleigh, NC 27613",
    yourZoned: false, distance: "15 mi",
    students: 536, studentTeacherRatio: 10, mathProficiency: null, readingProficiency: null,
    nicheGrade: "A", greatSchoolsRating: null, tuition: 15701, diversityIndex: 0.40,
    asianPct: 6.0, hispanicPct: 5.0, whitePct: 76.0, blackPct: 5.0, multiracialPct: 8.0,
    economicDisadvantaged: null, giftedProgram: true, calendar: "Traditional",
    stateRank: "N/A (Private) — Top 20% private schools in NC",
    schoolPath: "PK-12 on campus — full continuity through high school graduation",
    specialPrograms: "Classical Christian Trivium, Latin, Logic, Rhetoric, AP courses, College prep",
    notes: "Classical Christian PK-12 school. Strong academics with classical Trivium approach (Grammar, Logic, Rhetoric). 10:1 student-teacher ratio. Tuition $15,701 for elementary. Founded 1995. Top 20% of NC private schools. 15 miles in Raleigh.",
    sentimentScore: 80,
    sentimentSummary: "Very positive. Parents highlight rigorous classical curriculum, close-knit community, and strong moral formation. Some note limited diversity.",
    sentimentSources: "Niche (A, 4.1/5, 15+ reviews)",
    ncGrade: "N/A", ncScore: null, growthStatus: "Private — not graded by NCDPI",
    collegePrepScore: 82, satAvg: 1280, gradRate: 100, apParticipation: 70, collegeEnrollRate: 98, notableColleges: "Strong college placement; classical education produces well-prepared graduates",
    sourceLinks: { niche: "https://www.niche.com/k12/trinity-academy-of-raleigh-raleigh-nc/", pvsr: "https://www.privateschoolreview.com/trinity-academy-profile" },
  },
];

const FACTOR_DEFAULTS = [
  { key: "academic", label: "Academic Excellence", weight: 18, desc: "Math/reading proficiency, state rankings" },
  { key: "college", label: "College Outcomes", weight: 10, desc: "SAT/ACT, graduation rate, college enrollment, AP participation" },
  { key: "diversity", label: "Diversity and Inclusion", weight: 16, desc: "Racial/ethnic diversity index" },
  { key: "asianRep", label: "Asian Population %", weight: 10, desc: "Asian student enrollment %" },
  { key: "sentiment", label: "Online Sentiment", weight: 10, desc: "Aggregated review sentiment" },
  { key: "ratio", label: "Student-Teacher Ratio", weight: 10, desc: "Lower = more attention" },
  { key: "continuity", label: "K-8/12 Continuity", weight: 8, desc: "Avoids transitions" },
  { key: "cost", label: "Affordability", weight: 8, desc: "Tuition cost" },
  { key: "gifted", label: "Gifted/Advanced", weight: 10, desc: "AIG, enrichment, acceleration" },
];

function computeScore(school, factors) {
  const scores = {};
  const math = school.mathProficiency || 60;
  const reading = school.readingProficiency || 58;
  scores.academic = (math + reading) / 2;
  scores.diversity = school.diversityIndex * 100;
  scores.asianRep = Math.min(100, school.asianPct * 6.5);
  scores.sentiment = school.sentimentScore;
  // NC Report Card Grade (A=95, B=80, C=65, D=45, F=25, N/A=65 neutral)
  if (school.ncGrade === "A") scores.ncGrade = 95;
  else if (school.ncGrade === "B") scores.ncGrade = 80;
  else if (school.ncGrade === "C") scores.ncGrade = 65;
  else if (school.ncGrade === "D") scores.ncGrade = 45;
  else if (school.ncGrade === "F") scores.ncGrade = 25;
  else scores.ncGrade = 65; // N/A — private schools or new schools get neutral
  // College Outcomes (for HS/K-12 schools with data)
  if (school.collegePrepScore !== null) {
    scores.college = school.collegePrepScore;
  } else {
    scores.college = 60; // Neutral for elementary/middle/schools without data
  }
  // College Outcomes: weighted combo of SAT, grad rate, AP participation, college enrollment
  if (school.collegePrepScore !== null) {
    scores.college = school.collegePrepScore;
  } else {
    // For elementary/middle/K-8 schools, use pathway school data or neutral score
    const g = school.grades.toLowerCase();
    if (g.includes("k") && !g.includes("12") && !g.includes("10") && !g.includes("9")) {
      scores.college = 60; // Neutral for elementary/K-8 (depends on HS they feed into)
    } else {
      scores.college = 55; // Default for schools with no data yet
    }
  }
  scores.ratio = Math.max(0, Math.min(100, 100 - (school.studentTeacherRatio - 8) * 5));
  const g = school.grades.toLowerCase();
  if (g.includes("12") || g.includes("10")) scores.continuity = 95;
  else if (g.includes("8") || g.includes("9")) scores.continuity = 85;
  else scores.continuity = 55;
  if (school.tuition === 0) scores.cost = 100;
  else if (school.tuition <= 7000) scores.cost = 60;
  else scores.cost = 25;
  scores.gifted = school.giftedProgram ? 85 : 40;
  const tw = factors.reduce((s, f) => s + f.weight, 0);
  const w = factors.reduce((s, f) => s + (scores[f.key] * f.weight) / tw, 0);
  return { subscores: scores, total: w };
}

function ScoreBar({ value, color }) {
  return (
    <div style={{ width: "100%", background: "#1e1e38", borderRadius: 6, height: 7, overflow: "hidden" }}>
      <div style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color || "#4ecdc4", height: "100%", borderRadius: 6, transition: "width 0.5s" }} />
    </div>
  );
}

export default function SchoolDashboard() {
  const [factors, setFactors] = useState(FACTOR_DEFAULTS);
  const [sel, setSel] = useState(null);
  const [lvl, setLvl] = useState("Elementary");
  const [showW, setShowW] = useState(false);
  const [showS, setShowS] = useState(false);
  const [sort, setSort] = useState("total");

  const scored = useMemo(() => SCHOOLS.map(s => ({ ...s, ...computeScore(s, factors) })), [factors]);
  const filtered = useMemo(() => {
    let list = scored;
    if (lvl === "Elementary") list = list.filter(s => s.grades.match(/K-5|K-8|PK-5|PK-10|Infant/i));
    else if (lvl === "Middle") list = list.filter(s => s.grades.match(/6-8|K-8|Infant.*8/i));
    else if (lvl === "High") list = list.filter(s => s.grades.match(/9-1|PK-10|K-10/i));
    const sorters = { total: (a, b) => b.total - a.total, math: (a, b) => (b.mathProficiency||0) - (a.mathProficiency||0), asian: (a, b) => b.asianPct - a.asianPct, diversity: (a, b) => b.diversityIndex - a.diversityIndex, sentiment: (a, b) => b.sentimentScore - a.sentimentScore, ratio: (a, b) => a.studentTeacherRatio - b.studentTeacherRatio };
    return [...list].sort(sorters[sort] || sorters.total);
  }, [scored, lvl, sort]);

  const tw = factors.reduce((s, f) => s + f.weight, 0);
  const fc = { academic: "#4ecdc4", diversity: "#ff6b6b", asianRep: "#ff922b", sentiment: "#e879a8", ratio: "#ffd93d", continuity: "#c084fc", cost: "#6bcb77", gifted: "#74c0fc" };
  const tc = t => { if (t.includes("Montessori")) return "#c084fc"; if (t.includes("Private")) return "#ffd93d"; if (t.includes("Charter")) return "#ff6b6b"; if (t.includes("New")) return "#ff922b"; if (t.includes("Middle")) return "#74c0fc"; if (t.includes("High")) return "#e879a8"; return "#4ecdc4"; };

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: "linear-gradient(160deg,#0c0c1d,#111130,#0c0c1d)", color: "#e0e0ff", minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#0c0c1d}::-webkit-scrollbar-thumb{background:#2d2d5a;border-radius:3px}input[type=range]{-webkit-appearance:none;width:100%;height:4px;background:#1e1e38;border-radius:2px;outline:none}input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:#4ecdc4;cursor:pointer}a{color:#74c0fc;text-decoration:none}a:hover{text-decoration:underline}`}</style>

      <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid #1a1a3e", background: "linear-gradient(180deg,rgba(78,205,196,0.05),transparent)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 20, fontWeight: 700, background: "linear-gradient(90deg,#4ecdc4,#c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 6 }}>School Finder / 3625 Lily Orchard Way, Apex NC 27539</h1>
          <p style={{ color: "#8888aa", fontSize: 12.5, maxWidth: 800, lineHeight: 1.6 }}>
            Kindergarten 2027 | Pathway: <strong style={{ color: "#4ecdc4" }}>Oak Grove Elem</strong> &rarr; <strong style={{ color: "#74c0fc" }}>Lufkin Road Middle</strong> &rarr; <strong style={{ color: "#e879a8" }}>Felton Grove High</strong>
            <br/>{SCHOOLS.length} schools | {factors.length} weighted factors | 7+ data sources
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 24px" }}>
        <div style={{ background: "linear-gradient(135deg,rgba(78,205,196,0.08),rgba(255,107,107,0.06))", border: "1px solid #2d2d5a", borderRadius: 12, padding: 14, marginBottom: 20, fontSize: 12, lineHeight: 1.6 }}>
          <strong style={{ color: "#4ecdc4" }}>Your Base Assignment:</strong><span style={{ color: "#ccc", marginLeft: 6 }}>Oak Grove Elementary (year-round) | Lufkin Road Middle (year-round) | Felton Grove High</span>
          <br/><strong style={{ color: "#ff6b6b" }}>Verify:</strong><span style={{ color: "#aaa", marginLeft: 6 }}>2025-26 reassignment opened Felton Grove High and Rex Road Elem nearby. Use <a href="https://osageo.wcpss.net/assignment-lookup/" target="_blank" rel="noopener noreferrer">WCPSS Lookup</a> or call 919-431-7400 to confirm for 2027-28.</span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 5 }}>
            {["Elementary", "Middle", "High", "All"].map(t => (
              <button key={t} onClick={() => setLvl(t)} style={{ padding: "5px 14px", borderRadius: 18, border: "1px solid " + (lvl === t ? "#4ecdc4" : "#2d2d5a"), background: lvl === t ? "rgba(78,205,196,0.12)" : "transparent", color: lvl === t ? "#4ecdc4" : "#8888aa", cursor: "pointer", fontSize: 11.5, fontWeight: 600 }}>{t}</button>
            ))}
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: "5px 10px", borderRadius: 8, border: "1px solid #2d2d5a", background: "#111130", color: "#e0e0ff", fontSize: 11.5, cursor: "pointer" }}>
            <option value="total">Sort: Weighted Score</option><option value="math">Sort: Math %</option><option value="asian">Sort: Asian %</option><option value="diversity">Sort: Diversity</option><option value="sentiment">Sort: Sentiment</option><option value="ratio">Sort: Ratio</option>
          </select>
          <button onClick={() => setShowW(!showW)} style={{ padding: "5px 14px", borderRadius: 18, border: "1px solid #c084fc", background: showW ? "rgba(192,132,252,0.12)" : "transparent", color: "#c084fc", cursor: "pointer", fontSize: 11.5, fontWeight: 600 }}>Adjust Weights</button>
          <button onClick={() => setShowS(!showS)} style={{ padding: "5px 14px", borderRadius: 18, border: "1px solid #74c0fc", background: showS ? "rgba(116,192,252,0.12)" : "transparent", color: "#74c0fc", cursor: "pointer", fontSize: 11.5, fontWeight: 600, marginLeft: "auto" }}>Data Sources</button>
        </div>

        {showS && (
          <div style={{ background: "#16162e", border: "1px solid #2d2d5a", borderRadius: 12, padding: 18, marginBottom: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "#74c0fc", marginBottom: 10 }}>Data Sources and Methodology</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 8 }}>
              {SOURCES.map(s => (<div key={s.id} style={{ fontSize: 11.5, lineHeight: 1.5 }}><a href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>{s.name}</a><span style={{ color: "#777", marginLeft: 5 }}>{s.desc}</span></div>))}
            </div>
            <div style={{ marginTop: 10, fontSize: 10.5, color: "#555", lineHeight: 1.6 }}>
              <strong style={{ color: "#999" }}>Sentiment:</strong> Aggregated from Niche, GreatSchools, Movoto, Yelp. Formula: (avg rating / 5) x 80 + (positive ratio x 20). New schools = 70 baseline.
              <br/><strong style={{ color: "#999" }}>Diversity Index:</strong> 0 to 1. NC avg: 0.71. From NCES/PublicSchoolReview.
              <br/><strong style={{ color: "#999" }}>Test Scores:</strong> NC EOG 2023-24. Private/new schools lack data.
              <br/><strong style={{ color: "#999" }}>Assignment:</strong> MLS (RocketHomes, Estately, Homes.com) cross-ref with WCPSS.
              <br/><strong style={{ color: "#999" }}>Updated:</strong> February 2026.
            </div>
          </div>
        )}

        {showW && (
          <div style={{ background: "#16162e", border: "1px solid #2d2d5a", borderRadius: 12, padding: 18, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#c084fc" }}>Customize Weights</h3>
              <span style={{ fontSize: 11.5, color: tw === 100 ? "#4ecdc4" : "#ff6b6b" }}>Total: {tw}%{tw !== 100 && " (adjust to 100%)"}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 10 }}>
              {factors.map(f => (
                <div key={f.key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 7, height: 7, borderRadius: 4, background: fc[f.key], flexShrink: 0 }} />
                  <span style={{ fontSize: 11.5, width: 140, flexShrink: 0, color: "#bbb" }}>{f.label}</span>
                  <input type="range" min={0} max={50} value={f.weight} onChange={e => setFactors(p => p.map(x => x.key === f.key ? { ...x, weight: +e.target.value } : x))} style={{ flex: 1 }} />
                  <span style={{ fontSize: 11.5, fontFamily: "'JetBrains Mono',monospace", color: fc[f.key], width: 28, textAlign: "right" }}>{f.weight}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {filtered.map((s, i) => (
            <div key={s.name} onClick={() => setSel(sel === s.name ? null : s.name)} style={{
              background: sel === s.name ? "#1a1a3e" : s.yourZoned ? "linear-gradient(135deg,rgba(78,205,196,0.04),#12122a)" : "#12122a",
              border: "1px solid " + (s.yourZoned ? "#4ecdc450" : sel === s.name ? "#4ecdc4" : "#1a1a3e"),
              borderRadius: 10, padding: 14, cursor: "pointer", transition: "all 0.25s", position: "relative",
            }}>
              {s.yourZoned && <div style={{ position: "absolute", top: 8, right: 12, fontSize: 9, fontWeight: 700, color: "#4ecdc4", background: "rgba(78,205,196,0.12)", padding: "2px 8px", borderRadius: 10 }}>YOUR ZONED</div>}
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <div style={{ width: 32, height: 32, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", background: i === 0 ? "linear-gradient(135deg,#ffd93d,#ff922b)" : i === 1 ? "linear-gradient(135deg,#c0c0c0,#777)" : i === 2 ? "linear-gradient(135deg,#cd7f32,#a0522d)" : "#1a1a3e", color: i < 3 ? "#000" : "#777", fontWeight: 700, fontSize: 13, fontFamily: "'JetBrains Mono',monospace", flexShrink: 0 }}>#{i + 1}</div>
                <div style={{ flex: 1, minWidth: 170 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: 13.5, fontWeight: 600 }}>{s.name}</h3>
                    <span style={{ fontSize: 10, padding: "1px 8px", borderRadius: 10, background: tc(s.type) + "18", color: tc(s.type), fontWeight: 600 }}>{s.type}</span>
                    <span style={{ fontSize: 10.5, color: "#555" }}>{s.grades}</span>
                  </div>
                  <p style={{ fontSize: 10.5, color: "#555", marginTop: 1 }}>{s.distance} | {s.calendar}</p>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  {[
                    { l: "Math", v: s.mathProficiency ? s.mathProficiency + "%" : "N/A", c: "#4ecdc4" },
                    { l: "Read", v: s.readingProficiency ? s.readingProficiency + "%" : "N/A", c: "#74c0fc" },
                    { l: "Asian", v: s.asianPct + "%", c: "#ff922b" },
                    { l: "Div", v: s.diversityIndex.toFixed(2), c: s.diversityIndex >= 0.6 ? "#6bcb77" : s.diversityIndex >= 0.5 ? "#ffd93d" : "#ff6b6b" },
                    { l: "Sent.", v: s.sentimentScore + "", c: s.sentimentScore >= 80 ? "#6bcb77" : s.sentimentScore >= 70 ? "#ffd93d" : "#ff6b6b" },
                    { l: "Ratio", v: s.studentTeacherRatio + ":1", c: "#e0e0ff" },
                    { l: "Cost", v: s.tuition === 0 ? "Free" : "$" + (s.tuition / 1000).toFixed(0) + "K", c: s.tuition === 0 ? "#6bcb77" : "#ffd93d" },
                  ].map(m => (<div key={m.l} style={{ textAlign: "center", minWidth: 38 }}><div style={{ fontSize: 9.5, color: "#666" }}>{m.l}</div><div style={{ fontSize: 13, fontWeight: 700, color: m.c, fontFamily: "'JetBrains Mono',monospace" }}>{m.v}</div></div>))}
                  <div style={{ width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: `conic-gradient(${s.total >= 78 ? "#4ecdc4" : s.total >= 65 ? "#ffd93d" : "#ff6b6b"} ${s.total * 3.6}deg, #1a1a2e ${s.total * 3.6}deg)`, flexShrink: 0 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#12122a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, fontFamily: "'JetBrains Mono',monospace", color: s.total >= 78 ? "#4ecdc4" : s.total >= 65 ? "#ffd93d" : "#ff6b6b" }}>{Math.round(s.total)}</div>
                  </div>
                </div>
              </div>
              {sel === s.name && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #2d2d4a" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 14 }}>
                    <div>
                      <h4 style={{ fontSize: 11.5, fontWeight: 600, marginBottom: 7, color: "#c084fc" }}>Factor Scores</h4>
                      {factors.map(f => (<div key={f.key} style={{ marginBottom: 5 }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, marginBottom: 1.5 }}><span style={{ color: "#999" }}>{f.label} ({f.weight}%)</span><span style={{ fontFamily: "'JetBrains Mono',monospace", color: fc[f.key] }}>{Math.round(s.subscores[f.key])}</span></div><ScoreBar value={s.subscores[f.key]} color={fc[f.key]} /></div>))}
                    </div>
                    <div>
                      <h4 style={{ fontSize: 11.5, fontWeight: 600, marginBottom: 7, color: "#ff6b6b" }}>Demographics</h4>
                      {[{ l: "White", p: s.whitePct, c: "#6b7db3" }, { l: "Asian", p: s.asianPct, c: "#ff922b" }, { l: "Hispanic", p: s.hispanicPct, c: "#ffd93d" }, { l: "Black", p: s.blackPct, c: "#c084fc" }, { l: "Multi/Other", p: s.multiracialPct, c: "#4ecdc4" }].map(d => (
                        <div key={d.l} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                          <div style={{ width: 7, height: 7, borderRadius: 4, background: d.c, flexShrink: 0 }} />
                          <span style={{ width: 70, color: "#999", fontSize: 10.5 }}>{d.l}</span>
                          <div style={{ flex: 1, background: "#1e1e38", borderRadius: 3, height: 5, overflow: "hidden" }}><div style={{ width: `${d.p}%`, height: "100%", background: d.c, borderRadius: 3 }} /></div>
                          <span style={{ fontFamily: "'JetBrains Mono',monospace", width: 32, textAlign: "right", color: "#ccc", fontSize: 10.5 }}>{d.p}%</span>
                        </div>
                      ))}
                      <p style={{ fontSize: 10.5, color: "#555", marginTop: 5 }}>{s.students} students | DI: {s.diversityIndex.toFixed(2)} (NC: 0.71){s.economicDisadvantaged != null ? ` | ${s.economicDisadvantaged}% econ. disadv.` : ""}</p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: 11.5, fontWeight: 600, marginBottom: 7, color: "#e879a8" }}>Sentiment ({s.sentimentScore}/100)</h4>
                      <p style={{ fontSize: 10.5, color: "#aaa", lineHeight: 1.55, marginBottom: 6 }}>{s.sentimentSummary}</p>
                      <p style={{ fontSize: 10, color: "#555" }}>Sources: {s.sentimentSources}</p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: 11.5, fontWeight: 600, marginBottom: 7, color: "#ffd93d" }}>Details</h4>
                      <div style={{ fontSize: 11, lineHeight: 1.7, color: "#999" }}>
                        <div><strong style={{ color: "#ddd" }}>Niche:</strong> {s.nicheGrade}{s.greatSchoolsRating ? ` | GS: ${s.greatSchoolsRating}/10` : ""}</div>
                        <div><strong style={{ color: "#ddd" }}>Rank:</strong> {s.stateRank}</div>
                        <div><strong style={{ color: "#ddd" }}>Path:</strong> {s.schoolPath}</div>
                        <div><strong style={{ color: "#ddd" }}>Programs:</strong> {s.specialPrograms}</div>
                      </div>
                      <div style={{ marginTop: 6, fontSize: 10.5 }}>
                        <strong style={{ color: "#666" }}>View:</strong>{" "}
                        {Object.entries(s.sourceLinks).map(([k, u], j) => (<span key={k}>{j > 0 && " | "}<a href={u} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>{SOURCES.find(x => x.id === k)?.name || k}</a></span>))}
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: 10, background: "rgba(78,205,196,0.04)", borderRadius: 8, padding: 10, fontSize: 11, color: "#aaa", lineHeight: 1.55 }}>
                    <strong style={{ color: "#ddd" }}>Analysis:</strong> {s.notes}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pathway */}
        <div style={{ marginTop: 28, background: "#16162e", border: "1px solid #2d2d5a", borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: "#4ecdc4", fontFamily: "'JetBrains Mono',monospace" }}>Your K-12 Pathway</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16, fontSize: 12.5, lineHeight: 1.65, color: "#aaa" }}>
            <div>
              <h4 style={{ color: "#4ecdc4", fontSize: 12.5, marginBottom: 5 }}>Elementary (2027-2032)</h4>
              <p><strong style={{ color: "#e0e0ff" }}>Oak Grove Elementary</strong> is your base school (year-round). 61% math/reading, Niche A-, GS 6/10. Diversity index 0.64. 13:1 student-teacher ratio. Gifted & Talented program. 553 students with a smaller, community-oriented feel.</p>
              <p style={{ marginTop: 6 }}><strong style={{ color: "#999" }}>Alt:</strong> <strong style={{ color: "#e0e0ff" }}>Holly Springs Elem</strong> (not zoned but nearby, 83% math, Niche A) or <strong style={{ color: "#e0e0ff" }}>Pine Springs Prep</strong> (charter, free, K-8, lottery). Singapore Math.</p>
            </div>
            <div>
              <h4 style={{ color: "#74c0fc", fontSize: 12.5, marginBottom: 5 }}>Middle (2032-2035)</h4>
              <p><strong style={{ color: "#e0e0ff" }}>Lufkin Road Middle</strong> is your base (year-round). GS 10/10, Niche A, U.S. News #89 in NC. 2.1 mi from home. Growth score 89th percentile. Mixed student reviews but strong institutional ratings.</p>
              <p style={{ marginTop: 6 }}><strong style={{ color: "#999" }}>Note:</strong> Holly Ridge Middle (traditional calendar) may be an option. Contact WCPSS.</p>
            </div>
            <div>
              <h4 style={{ color: "#e879a8", fontSize: 12.5, marginBottom: 5 }}>High (2035-2039)</h4>
              <p><strong style={{ color: "#e0e0ff" }}>Felton Grove High</strong> is your base high school per WCPSS. On Stephenson Rd, only 1.5 mi away. Opened 2025, expanding to full 9-12 by ~2028. Will be fully operational well before your child reaches HS (~2036). Modern facilities for 2,200+ students.</p>
            </div>
            <div>
              <h4 style={{ color: "#6bcb77", fontSize: 12.5, marginBottom: 5 }}>Action Items</h4>
              <p>1) Confirm assignment: <a href="https://osageo.wcpss.net/assignment-lookup/" target="_blank" rel="noopener noreferrer">WCPSS Lookup</a> or 919-431-7400
              <br/>2) Charter lottery: Apply Jan-Feb 2027
              <br/>3) Tour top 3 schools in person
              <br/>4) Ask about AIG screening and enrichment
              <br/>5) Private schools have rolling admission</p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20, fontSize: 10.5, color: "#444", textAlign: "center", paddingBottom: 28, lineHeight: 1.7 }}>
          <strong style={{ color: "#666" }}>Sources:</strong> Niche | GreatSchools | SchoolDigger | U.S. News | NCDPI | PublicSchoolReview | PrivateSchoolReview | WCPSS
          <br/>Test: EOG 2023-24. Demographics: NCES. Sentiment: aggregated estimates. Assignments subject to redistricting.
        </div>
      </div>
    </div>
  );
}
