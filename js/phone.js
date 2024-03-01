const loadPhone = async(searchText,isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones,isShowAll)
}

const displayPhones = (phones,isShowAll) =>{
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');
    //clear container
    phoneContainer.textContent = '';

    // display show all button 
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
      showAllContainer.classList.remove('hidden');
    }
    else{
      showAllContainer.classList.add('hidden');
    }

    // console.log('is show all',isShowAll);

    //display only 12 if not show all
    if(!isShowAll){
      phones = phones.slice(0,12);
    }

    phones.forEach(phone =>{
        // console.log(phone);
        //2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
        //3 set innerhtml
        phoneCard.innerHTML = `
        <figure><img class="bg-[#0D6EFD0D]" src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class=" font-bold text-2xl text-center">${phone.phone_name}</h2>
          <p class="text-center">There are many variations of passages of available, but the majority have suffered</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary w-[180px]">Show Details</button>
          </div>
        </div>`;
        //4 append child
        phoneContainer.appendChild(phoneCard)
    });

    // hide loading spinner 
    toggleLoadingSpinner(false);
}

//
const handleShowDetail = async (id) =>{
  // console.log('clicked show details',id);
  // load single phone data 
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;

  showPhoneDetails(phone)
}

const showPhoneDetails = (phone) =>{
  console.log(phone);
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
  <img src="${phone.image}" alt=""/>
  <p><span class="text-base font-semibold">Storage: </span>${phone?.mainFeatures?.storage}</p>
  <p><span class="text-base font-semibold">Display Size: </span>${phone.mainFeatures?.displaySize}</p>
  <p><span class="text-base font-semibold">Chipset: </span>${phone.mainFeatures?.chipSet}</p>
  <p><span class="text-base font-semibold">Memory: </span>${phone.mainFeatures?.memory}</p>
  <p><span class="text-base font-semibold">Slug: </span>${phone.slug}</p>
  <p><span class="text-base font-semibold">Release data: </span>${phone.releaseDate}</p>
  <p><span class="text-base font-semibold">Brand: </span>${phone.brand}</p>
  <p><span class="text-base font-semibold">GPS: </span>${phone.others?.GPS || 'No GPS available'}</p>
  `

  // show modal
  show_details_modal.showModal()
}

//handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText,isShowAll);
}

const toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden')
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
}

// handle show all 
const handleShowAll = () =>{
  handleSearch(true);
}

// loadPhone();