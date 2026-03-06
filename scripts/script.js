const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'
const card = document.querySelector('.card-container');

const issuesCard = async () => {
	let response = await fetch(url);
    let result = await response.json();
    let datas = result.data;
    card.innerHTML = '';
    for(const issue of datas){
        let div = document.createElement('div');

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
        div.innerHTML = `
            <div class="card-content bg-[#faf9f9] py-7 rounded-xl shadow-lg h-full">
                <div class="flex justify-between items-center mb-6 px-6">
                    <img src="assets/${issue.status}-Status.png" alt="">
                    <div class="${priorityBg} px-6 py-1.5 rounded-full">
                        <p class="${priorityText} text-[14px] font-medium">${issue.priority.toUpperCase()}</p>
                    </div>
                </div>
                <div class="px-6 h-[190px]">
                    <h4 class="font-semibold text-[16px] text-[#1F2937] mb-4">${issue.title}</h4>
                    <p class="text-[#64748B] text-[14px] mb-4">${issue.description}</p>
                    <div class="flex gap-2 mb-6">
                        ${issue.labels[0] ? `
                            <div class="bg-[#DEFCE8] px-3 py-1.5 rounded-sm lg:rounded-full border border-[#89fab1]">
                                <p class="text-[#00A96E] text-[12px] font-medium">${issue.labels[0].toUpperCase()}</p>
                            </div>
                        ` : ''}
                        ${issue.labels[1] ? `
                            <div class="bg-[#FFF8DB] px-3 py-1.5 rounded-sm lg:rounded-full border border-[#FDE68A]">
                                <p class="text-[#D97706] text-[12px] font-medium">${issue.labels[1].toUpperCase()}</p>
                            </div>
                        ` : ''}    
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
}
issuesCard();