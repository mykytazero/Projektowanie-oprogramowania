type Towar = {
  id: number;
  nazwa: string;
  sztuki: number;
};

let magazyn: Towar[] = [];
let aktualneId: number | null = null;

const formEl = document.querySelector<HTMLFormElement>('#towar-form')!;
const nazwaInput = document.querySelector<HTMLInputElement>('#input-nazwa')!;
const iloscInput = document.querySelector<HTMLInputElement>('#input-ilosc')!;
const tbodyEl = document.querySelector<HTMLTableSectionElement>('#tabela-body')!;

function renderujTabele(): void {
  tbodyEl.innerHTML = '';

  magazyn.forEach(towar => {
    const wiersz = tbodyEl.insertRow();
    
    wiersz.insertCell().textContent = towar.nazwa;
    wiersz.insertCell().textContent = String(towar.sztuki);
    
    const komorkaAkcji = wiersz.insertCell();

    const btnEdycja = document.createElement('button');
    btnEdycja.textContent = 'Edytuj';
    btnEdycja.onclick = () => {
      nazwaInput.value = towar.nazwa;
      iloscInput.value = String(towar.sztuki);
      aktualneId = towar.id;
    };

    const btnUsun = document.createElement('button');
    btnUsun.textContent = 'Usuń';
    btnUsun.onclick = () => {
      magazyn = magazyn.filter(t => t.id !== towar.id);
      renderujTabele();
    };

    komorkaAkcji.append(btnEdycja, btnUsun);
  });
}

formEl.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault();

  const wpisanaNazwa = nazwaInput.value.trim();
  const wpisaneSztuki = Number(iloscInput.value);

  if (!wpisanaNazwa || iloscInput.value === '' || wpisaneSztuki < 0) return;

  if (aktualneId === null) {
    magazyn.push({
      id: Date.now(),
      nazwa: wpisanaNazwa,
      sztuki: wpisaneSztuki
    });
  } else {
    const znaleziony = magazyn.find(t => t.id === aktualneId);
    if (znaleziony) {
      znaleziony.nazwa = wpisanaNazwa;
      znaleziony.sztuki = wpisaneSztuki;
    }
    aktualneId = null;
  }

  formEl.reset();
  renderujTabele();
});