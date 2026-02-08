/* ob-data.js
   Source: NEOS OM Part D Appendices, Doc NFP-04 APX, Chapter F, pages 76–78.
*/

(() => {
  "use strict";

  // Competency codes we will use in UI
  // KNO, FPM, FPA, PRO, WLM, SAW, PSD, COM, LTW

  const OB_DATA = {
    KNO: {
      name: "Application of Knowledge",
      desc:
        "Demonstrates knowledge and understanding of relevant information, operating instructions, aircraft systems and the operating environment",
      obs: {
        OB1: "Demonstrates practical and applicable knowledge of limitations and systems and their interaction",
        OB2: "Demonstrates required knowledge of published operating instructions",
        OB3: "Demonstrates knowledge of the physical environment, the air traffic environment, and the operational infrastructure (including air traffic routings, weather, airports)",
        OB4: "Demonstrates appropriate knowledge of applicable legislation",
        OB5: "Knows where to source required information",
        OB6: "Demonstrates a positive interest in acquiring knowledge",
        OB7: "Is able to apply knowledge effectively"
      }
    },

    FPM: {
      name: "Flight Path Management – Manual",
      desc: "Controls the flight path through manual control",
      obs: {
        OB1: "Controls the airplane manually with accuracy and smoothness as appropriate to the situation",
        OB2: "Monitors and detects deviations from the intended flight path and takes appropriate action",
        OB3: "Manually controls the airplane using the relationship between airplane attitude, speed and thrust, and navigation signals or visual information",
        OB4: "Manages the flight path to achieve optimum operational performance",
        OB5: "Maintains the intended flight path during manual flight while managing other tasks and distractions",
        OB6: "Uses appropriate flight management and guidance systems, as installed and applicable to the conditions",
        OB7: "Effectively monitors flight guidance systems including engagement and automatic mode transitions"
      }
    },

    FPA: {
      name: "Flight Path Management – Automation",
      desc: "Controls the flight path through automation",
      obs: {
        OB1: "Uses appropriate flight management and guidance systems, as installed and applicable to the conditions",
        OB2: "Monitors and detects deviations from the intended flight path and takes appropriate action",
        OB3: "Manages the flight path to achieve optimum operational performance",
        OB4: "Maintains the intended flight path during flight using automation while managing other tasks and distractions",
        OB5: "Selects appropriate level and mode of automation in a timely manner considering phase of flight and workload",
        OB6: "Effectively monitors automation, including engagement and automatic mode transitions"
      }
    },

    PRO: {
      name: "Application of Procedures and Compliance with Regulations",
      desc:
        "Identifies and applies appropriate procedures in accordance with published operating instructions and applicable regulations",
      obs: {
        OB1: "Identifies where to find procedures and regulations",
        OB2: "Applies relevant operating instructions, procedures and techniques in a timely manner",
        OB3: "Follows SOPs unless a higher degree of safety dictates an appropriate deviation",
        OB4: "Operates airplane systems and associated equipment correctly",
        OB5: "Monitors aircraft systems status",
        OB6: "Complies with applicable regulations",
        OB7: "Applies relevant procedural knowledge"
      }
    },

    WLM: {
      name: "Workload Management",
      desc:
        "Maintains available workload capacity by prioritising and distributing tasks using appropriate resources",
      obs: {
        OB1: "Exercises self-control in all situations",
        OB2: "Plans, prioritises and schedules appropriate tasks effectively",
        OB3: "Manages time efficiently when carrying out tasks",
        OB4: "Offers and gives assistance",
        OB5: "Delegates tasks",
        OB6: "Seeks and accepts assistance, when appropriate",
        OB7: "Monitors, reviews, and cross-checks actions conscientiously",
        OB8: "Verifies that tasks are completed to the expected outcome",
        OB9: "Manages and recovers from interruptions, distractions, variations, and failures effectively while performing tasks"
      }
    },

    SAW: {
      name: "Situation Awareness and Management of Information",
      desc:
        "Perceives, comprehends and manages information and anticipates its effect on the operation",
      obs: {
        OB1: "Monitors and assesses the state of the airplane and its systems",
        OB2: "Monitors and assesses the airplane’s energy state, and its anticipated flight path",
        OB3: "Monitors and assesses the general environment as it may affect the operation",
        OB4: "Validates the accuracy of information and checks for gross errors",
        OB5: "Maintains awareness of the people involved in, or affected by, the operation and their capacity to perform as expected",
        OB6: "Develops effective contingency plans based upon potential risks associated with threats and errors",
        OB7: "Responds to indications of reduced situation awareness"
      }
    },

    PSD: {
      name: "Problem Solving and Decision Making",
      desc: "Identifies precursors, mitigates problems, and makes decisions",
      obs: {
        OB1: "Identifies, assesses and manages threats and errors in a timely manner",
        OB2: "Seeks accurate and adequate information from appropriate sources",
        OB3: "Identifies and verifies what and why things have gone wrong, if appropriate",
        OB4: "Perseveres in working through problems while prioritising safety",
        OB5: "Identifies and considers appropriate options",
        OB6: "Applies appropriate and timely decision-making techniques",
        OB7: "Monitors, reviews, and adapts decisions as required",
        OB8: "Adapts when faced with situations where no guidance or procedure exists",
        OB9: "Demonstrates resilience when encountering an unexpected event"
      }
    },

    COM: {
      name: "Communication",
      desc:
        "Communicates through appropriate means in the operational environment, in both normal and non-normal situations",
      obs: {
        OB1: "Determines that the recipient is ready and able to receive information",
        OB2: "Selects appropriately what, when, how, and with whom to communicate",
        OB3: "Conveys messages clearly, accurately and concisely",
        OB4: "Confirms that the recipient demonstrates understanding of important information",
        OB5: "Listens actively and demonstrates understanding when receiving information",
        OB6: "Asks relevant and effective questions",
        OB7: "Uses appropriate escalation in communication to resolve identified deviations",
        OB8: "Uses and interprets non-verbal communication in a manner appropriate to the organisational and social culture",
        OB9: "Adheres to standard radiotelephone phraseology and procedures",
        OB10: "Accurately reads, interprets, constructs, and responds to datalink messages in English"
      }
    },

    LTW: {
      name: "Leadership and Teamwork",
      desc:
        "Influences others to contribute to a shared purpose. Collaborates to accomplish the goals of the team",
      obs: {
        OB1: "Encourages team participation and open communication",
        OB2: "Demonstrates initiative and provides direction when required",
        OB3: "Engages others in planning",
        OB4: "Considers inputs from others",
        OB5: "Gives and receives feedback constructively",
        OB6: "Addresses and resolves conflicts and disagreements in a constructive manner",
        OB7: "Exercises decisive leadership when required",
        OB8: "Accepts responsibility for decisions and actions",
        OB9: "Carries out instructions when directed",
        OB10: "Applies effective intervention strategies to resolve identified deviations",
        OB11: "Manages cultural and language challenges, as applicable"
      }
    }
  };

  // Expose in window for app.js (no build tools needed)
  window.OB_DATA = OB_DATA;
})();

