const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'
const card = document.querySelector('.card-container');
const allBtn = document.querySelector('#all-btn');
const openBtn = document.querySelector('#open-btn');
const closedBtn = document.querySelector('#closed-btn');
const issueCount = document.querySelector('#issue-count')
const cardContainer = document.querySelector('.card-container')
// create card function 
const createCard = issue => {

    // priority customize
    let priorityBg = '';
    let priorityText = '';
    if(issue.priority === 'high'){
        priorityBg = 'bg-[#FEECEC]';
        priorityText = 'text-[#EF4444]';
    }
    else if(issue.priority === 'medium'){
        priorityBg = 'bg-[#FFF6D1]';
        priorityText = 'text-[#F59E0B]';
    }
    else if(issue.priority === 'low'){
        priorityBg = 'bg-[#EEEFF2]';
        priorityText = 'text-[#9CA3AF]';
    }

    // label customize
    let labelsHTML = '';
    for(const label of issue.labels){
        let labelBG = '';
        let labelText = '';
        let labelBorder = '';

        if(label === 'bug'){
            labelBG = 'bg-[#FEECEC]';
            labelText = 'text-[#EF4444]';
            labelBorder = 'border-[#FECACA]';
        }
        else if(label === 'enhancement'){
            labelBG = 'bg-[#BBF7D0]';
            labelText = 'text-[#00A96E]';
            labelBorder = 'border-[#7cffa8]';
        }
        else if(label === 'help wanted'){
            labelBG = 'bg-[#FFF8DB]';
            labelText = 'text-[#D97706]';
            labelBorder = 'border-[#FDE68A]';
        }
        else if(label === 'good first issue'){
            labelBG = 'bg-[#EEF2FF]';
            labelText = 'text-[#6366F1]';
            labelBorder = 'border-[#C7D2FE]';
        }
        else if(label === 'documentation'){
            labelBG = 'bg-[#F1F5F9]';
            labelText = 'text-[#475569]';
            labelBorder = 'border-[#CBD5F1]';
        }
        labelsHTML += `
            <div class="${labelBG} px-3 py-1.5 rounded-full border ${labelBorder}">
                <p class="${labelText} text-[12px] font-medium">${label.toUpperCase()}</p>
            </div>
        `
    }

    // top border add
    let borderT = '';
    if(issue.status === 'open'){
        borderT = 'border-t-4 border-[#00A96E]';
    }
    else if(issue.status === 'closed'){
        borderT = 'border-t-4 border-[#A855F7]';
    }

    // card structure
    let div = document.createElement('div');
    div.innerHTML = `
        <div class="card-content bg-[#faf9f9] py-7 rounded-xl shadow-lg h-full ${borderT}">
            <div class="flex justify-between items-center mb-6 px-6">
                <img src="assets/${issue.status}-status.png" alt="">
                <div class="${priorityBg} px-6 py-1.5 rounded-full">
                    <p class="${priorityText} text-[14px] font-medium">${issue.priority.toUpperCase()}</p>
                </div>
            </div>
            <div class="px-6 md:h-[190px]">
                <h4 class="font-semibold text-[16px] text-[#1F2937] mb-4">${issue.title}</h4>
                <p class="text-[#64748B] text-[14px] mb-4">${issue.description}</p>
                <div class="flex flex-wrap gap-2 mb-6">
                    ${labelsHTML} 
                </div>
            </div>
            <div class="border-b-2 border-[#2828280f]"></div>
            <div class="pt-5 px-6 flex justify-between">
                <div>
                    <p class="text-[#64748B] text-[12px]"># ${issue.id} by ${issue.author}</p>
                    <p class="text-[#64748B] text-[12px]">Assignee:<br> ${issue.assignee}</p>
                </div>
                <div>
                    <p class="text-[#64748B] text-[12px]">Created:<br> ${issue.createdAt}</p>
                    <p class="text-[#64748B] text-[12px]">Updated:<br> ${issue.updatedAt}</p>
                </div>
            </div>
        </div>
    `
    card.append(div);
}

// card fetch
const issuesCard = async () => {
	let response = await fetch(url);
    let result = await response.json();
    let datas = result.data;

    // all cards
    card.innerHTML = '';
    for(const data of datas){
        createCard(data);
    }

    // issue-count
    let count = cardContainer.children.length;
    issueCount.innerHTML = count + ' Issues';

    // open button toggle
    openBtn.addEventListener('click',() => {

        // button class add and remove
        openBtn.classList.remove('btn-soft');
        allBtn.classList.add('btn-soft');
        closedBtn.classList.add('bg-purple-100', 'text-purple-600');
        closedBtn.classList.remove('bg-purple-600', 'text-purple-100');

        //open btn -> cards
        card.innerHTML = '';
        for(const dataOpen of datas){
            if(dataOpen.status === 'open'){
                createCard(dataOpen);
            }
        }

        // open-issue-count
        let count = cardContainer.children.length;
        issueCount.innerHTML = count + ' Issues';
    })

    // closed button toggle
    closedBtn.addEventListener('click',() => {

        // button class add and remove
        openBtn.classList.add('btn-soft');
        allBtn.classList.add('btn-soft');
        closedBtn.classList.remove('bg-purple-100', 'text-purple-600');
        closedBtn.classList.add('bg-purple-600', 'text-purple-100');

        //closed btn -> cards
        card.innerHTML = '';
        for(const dataClosed of datas){
            if(dataClosed.status === 'closed'){
                createCard(dataClosed);
            }
        }

        // closed-issue-count
        let count = cardContainer.children.length;
        issueCount.innerHTML = count + ' Issues';
    })

    // all button toggle
    allBtn.addEventListener('click',() => {

        // button class add and remove
        openBtn.classList.add('btn-soft');
        allBtn.classList.remove('btn-soft');
        closedBtn.classList.add('bg-purple-100', 'text-purple-600');
        closedBtn.classList.remove('bg-purple-600', 'text-purple-100');

        //all btn -> cards
        card.innerHTML = '';
        for(const dataAll of datas){
            createCard(dataAll);
        }

        // all-issue-count
        let count = cardContainer.children.length;
        issueCount.innerHTML = count + ' Issues';
    })
}
issuesCard();
