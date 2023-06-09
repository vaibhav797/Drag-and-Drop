const container2 = document.querySelector('.container2');
const container1 = document.querySelector('.container1');
const draggable = document.querySelectorAll('.draggable');
const successMessage = document.querySelector('.success-msg');


// Adding and removing dragging class at the time when drag has been started and over respectively
draggable.forEach((child) => {
    child.addEventListener('dragstart', () => {
        child.classList.add('dragging');
    })

    child.addEventListener('dragend', () => {
        child.classList.remove('dragging');

    })
})


// this allow user to decide the position of the dragged element in second container
container2.addEventListener('dragover', (e) => {
    e.preventDefault();

    // this closest element before which the dragged element is being placed
    // getAfterElement element function will return that element.
    const afterElement = getAfterElement(container2, e.clientY);

    const draggable = document.querySelector('.dragging');


    if (afterElement === null) 
    {
    // if mouse is not over any element then append dragged element at last of the container.
        container2.appendChild(draggable);
    }
    else {
        // else put the draggable element before afterElement.
        container2.insertBefore(draggable, afterElement);
    }
});


// if drag ends over second container then it is confirmed that element has been placed in second container.
// hence, success message is shown.
container2.addEventListener('dragend',()=>{
    successMessage.style.display = 'block';

    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 4000);
})


container2.addEventListener('dragover',()=>{
    successMessage.style.display = 'none';
})


// this function takes two parameters first is (second container) and second is position of mouse which
// is carrying the dragged element. Essentially the position of the dragged element.
const getAfterElement = (container, y) => {
    //spreading only the elements of container which does not have class dragging and storing that array.
    const allElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

    // iterating over every element of the container and finding out the closest element.
    const afterElement = allElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();

        const d = (y - (box.y + box.height / 2));
        if (d < 0 && d > closest.dist) {
            // d < 0 tells that the dragged element position is above atleast one element
            return { dist: d, element: child }
        }
        else return closest;
    }, { dist: Number.NEGATIVE_INFINITY }).element;

    return afterElement;
}

