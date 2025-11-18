const moviesData = [
    {
      id: 1,
      title: 'Lisbela e o Prisioneiro',
      city: 'rj',
      status: 'now',
      thumb: 'https://picsum.photos/seed/lisbela/700/500',
      genre: 'comédia',
      desc: 'Um romance brasileiro divertido e emocionante.',
      loc: 'Cine Leblon, RJ',
      lat: -22.983740,
      lng: -43.219320,
      times: ['18:30', '20:00', '22:30']
    },
    {
      id: 2,
      title: 'Meu Nome Não é Jhonny',
      city: 'rj',
      status: 'premiere',
      thumb: 'https://picsum.photos/seed/jhonny/700/500',
      genre: 'biografia',
      desc: 'História real cheia de drama e reviravoltas.',
      loc: 'Estação Botafogo, RJ',
      lat: -22.951911,
      lng: -43.185730,
      times: ['19:00', '21:00']
    },
    {
      id: 3,
      title: 'O Cheiro do Ralo',
      city: 'rj',
      status: 'soon',
      thumb: 'https://picsum.photos/seed/cheiro/700/500',
      genre: 'comédia',
      desc: 'Sátira ácida com humor peculiar.',
      loc: 'Shopping Rio Sul, RJ',
      lat: -22.953220,
      lng: -43.171440,
      times: ['15:00', '17:30']
    },
    {
      id: 4,
      title: 'Aventura Urbana',
      city: 'sp',
      status: 'closed',
      thumb: 'https://picsum.photos/seed/aventura/700/500',
      genre: 'ação',
      desc: 'Emoção e velocidade pelas ruas.',
      loc: 'Bourbon Pompeia, SP',
      lat: -23.527430,
      lng: -46.679410,
      times: []
    },
    {
      id: 5,
      title: 'Cidade Invisível',
      city: 'sp',
      status: 'now',
      thumb: 'https://picsum.photos/seed/cidade/700/500',
      genre: 'fantasia',
      desc: 'Criaturas místicas brasileiras ganham vida em SP.',
      loc: 'Cinemark Eldorado, SP',
      lat: -23.573490,
      lng: -46.691700,
      times: ['14:45', '17:20', '20:10']
    },
    {
      id: 6,
      title: 'Terror na Floresta Amazônica',
      city: 'am',
      status: 'premiere',
      thumb: 'https://picsum.photos/seed/terror/700/500',
      genre: 'terror',
      desc: 'Lenda amazônica se torna mais real do que se imaginava.',
      loc: 'UCI Manaus Plaza, AM',
      lat: -3.101940,
      lng: -60.025000,
      times: ['19:30', '22:10']
    },
    {
      id: 7,
      title: 'Mar de Esperança',
      city: 'sc',
      status: 'soon',
      thumb: 'https://picsum.photos/seed/mar/700/500',
      genre: 'drama',
      desc: 'Uma história emocionante sobre recomeços.',
      loc: 'Cinesystem Florianópolis, SC',
      lat: -27.596900,
      lng: -48.549500,
      times: ['Em breve']
    },
    {
      id: 8,
      title: 'Robôs do Futuro',
      city: 'sp',
      status: 'premiere',
      thumb: 'https://picsum.photos/seed/robots/700/500',
      genre: 'ficção científica',
      desc: 'Humanos e IA lutam pelo controle da sociedade.',
      loc: 'Cinesala Vila Madalena, SP',
      lat: -23.557470,
      lng: -46.692020,
      times: ['16:00', '19:40', '22:15']
    }
  ];
  
  const grid = document.getElementById('movies');
  const search = document.getElementById('search');
  const chips = document.querySelectorAll('.chip');
  const datetime = document.getElementById('datetime');
  
  function formatDateTime(){
     const d = new Date();
     datetime.textContent = d.toLocaleString('pt-BR');
  }
  setInterval(formatDateTime,1000);
  
  function render(list){
    grid.innerHTML='';
    list.forEach(m=>{
      const el=document.createElement('article');
      el.className='movie';
      el.innerHTML=`
       <div class="thumb" style="background-image:url('${m.thumb}')"></div>
       <div class="meta">
         <h3>${m.title}</h3>
         <span class="badge ${m.status}">${statusTxt(m.status)}</span>
       </div>`;
      el.onclick=()=>openModal(m);
      grid.appendChild(el);
    });
  }
  
  function statusTxt(s){
   return {now:'Em cartaz',soon:'Em breve',premiere:'Pré-estreia',closed:'Encerrado'}[s];
  }
  
  function applyFilters(){
    const q = search.value.toLowerCase();
    const activeStatus = document.querySelector('.chip.active').dataset.status;
  
    const filtered = moviesData.filter(m=>(
       (m.title.toLowerCase().includes(q) || m.genre.includes(q) || m.city.includes(q)) &&
       (activeStatus === 'all' || m.status === activeStatus)
    ));
    render(filtered);
  }
  
  search.oninput = applyFilters;
  chips.forEach(c=>c.onclick=()=>{
    chips.forEach(x=>x.classList.remove('active'));
    c.classList.add('active');
    applyFilters();
  });
  
  function openModal(m){
    document.getElementById('modal').classList.add('open');
    document.getElementById('modal-thumb').style.backgroundImage=`url('${m.thumb}')`;
    document.getElementById('modal-title').textContent=m.title;
  
    const statusEl = document.getElementById('modal-status');
    statusEl.className = `badge ${m.status}`;
    statusEl.textContent = statusTxt(m.status);
  
    document.getElementById('modal-desc').textContent=m.desc;
    document.getElementById('map').src =
    `https://maps.google.com/maps?q=${m.lat},${m.lng}&z=15&output=embed`;
    
    const ul = document.getElementById('modal-times');
    ul.innerHTML = m.times.length ? m.times.map(t=>`<li>${t}</li>`).join('') : '<li>Sem sessões no momento</li>';
  }
  
  document.getElementById('modal-close').onclick = ()=>{
    document.getElementById('modal').classList.remove('open');
  }
  
  render(moviesData);
  formatDateTime();
  