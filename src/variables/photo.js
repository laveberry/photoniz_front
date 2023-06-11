// ##############################
// // // tasks list for Tasks card in Dashboard view
// #############################

const tasks = [
    {
      checked: true,
      text: 'Sign contract for "What are conference organizers afraid of?"'
    },
    {
      checked: false,
      text: "Lines From Great Russian Literature? Or E-mails From My Boss?"
    },
    {
      checked: true,
      text: "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit"
    }
  ];
  
  // ##############################
  // // // table head data and table body data for Tables view
  // #############################
  
  const thead = ["번호", "작가", "제목", "지역", "가격"];
  const tbody = [
    {
      className: "table-success",
      data: ["1", "Niger", "Oud-Turnhout", "서울" , "$36,738"]
    },
    {
      className: "",
      data: ["2", "Curaçao", "Sinaai-Waas", "테스트", "$23,789"]
    },
    {
      className: "table-info",
      data: ["3", "Netherlands", "Baileux", "테스트", "$56,142"]
    }
    
  ];
  
  // tasks list for Tasks card in Dashboard view
  // data for <thead> of table in TableList view
  // data for <tbody> of table in TableList view
  export { tasks, thead, tbody };
  