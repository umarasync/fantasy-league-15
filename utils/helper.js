export const searchInArray =(searchQuery, array, objectKey=null)=>{

    return array.filter(d=>{
        let data =objectKey? d[objectKey] : d //Incase If It's Array Of Objects.
        let dataWords= typeof data=="string" && data?.split(" ")?.map(b=>b&&b.toLowerCase().trim()).filter(b=>b)
        let searchWords = typeof searchQuery=="string"&&searchQuery?.split(" ").map(b=>b&&b.toLowerCase().trim()).filter(b=>b)

        let matchingWords = searchWords.filter(word=>dataWords.includes(word))

        return matchingWords.length

    })
}
