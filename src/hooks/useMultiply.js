
const useMultiply = (numbers = []) =>{
   let result = 1
    for(let i=0; i< numbers.length; i++){
        result = numbers[i] + result
    }
    return numbers
}

export default useMultiply