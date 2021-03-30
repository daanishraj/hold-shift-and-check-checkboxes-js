/*
how does the shift key property work? The number of the last checkbox which has been clicked is recorded. While going forward, all the checkboxes
between this last checkbox and the current checkbox are checked. 
While going backwards

my implementation

1. get all the checkboxes on the page and save them in an array
2. Note the last checkbox which has been clicked - start with a default of the last checkbox in list (mostRecentlyCheckedBox)
3. Now watch for mouseevent shift key
4. Watch for a checkbox being checked
5. When 3. and 4. happen concurrently, then :
    note the position of the checkbox which was most recently checked. Now check all the boxes between this box and the mostRecentlyCheckedBox
    update the position of mostRecentlyCheckedBox
*/

//static nodeList
let checkboxArray = document.querySelectorAll('input[type="checkbox"]')
console.dir(checkboxArray)

let mostRecentlyCheckedBox = -1;


let list = document.querySelector('.inbox')
console.dir(list)
let isShiftKeyDown = false;

document.addEventListener('keydown', event => {
    if (event.shiftKey) {
        isShiftKeyDown = true;

    }
})

document.addEventListener('keyup', event => {
    if (event.shiftKey) {
        isShiftKeyDown = false;

    }
})


list.addEventListener('click', e => {
    if (e.target.type === "checkbox" && e.target.checked === true) {
        let item = e.target.parentNode
        let items = Array.from(item.parentNode.children);
        let index = items.indexOf(item);

        if (isShiftKeyDown && mostRecentlyCheckedBox !== -1) {
            checkAllBoxesInRange(mostRecentlyCheckedBox, index)
        }
        mostRecentlyCheckedBox = index
    }

})

function checkAllBoxesInRange(firstClicked, secondClicked) {
    let checkboxSubarray;
    if (firstClicked < secondClicked) {
        checkboxSubarray = Array.from(checkboxArray).slice(firstClicked, secondClicked)
        checkboxSubarray.forEach(checkBox => checkBox.checked = true)

    } else if (firstClicked > secondClicked) {
        checkboxSubarray = Array.from(checkboxArray).slice(secondClicked, firstClicked)
        checkboxSubarray.forEach(checkBox => checkBox.checked = true)

    } else {
        //do nothing
    }
}

