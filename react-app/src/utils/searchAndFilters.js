export default function filterResults(list,search,query){

    const filteredList = []
    if(search.length){
        filteredList.concat(broadSearch(list,search))
    }
    if(Object.values(query).join('').length){
        filteredList.concat(querySearch(list,query))
    }

    return filteredList
}


// query{
//     city: "" // []
// }
function querySearch(list,query){
    filteredList = []
    for(let biz in list){
        if(query.city && new RegExp(query.city, 'gi').test(biz.city)){
            filteredList.push(biz)
            continue
        }
        if(query.state && new RegExp(query.state, 'gi').test(biz.state)){
            filteredList.push(biz)
            continue
        }
        if(query.price){
            let prices = query.price.split(',')
            for(let price in prices){
                if(price == biz.price){
                    filteredList.push(biz)
                    continue
                }
            }
        }
        if(query.categories){
            let categories = query.categories.split(',')
            for(let cat in categories){
                if(scanCategories(cat,biz.categories)){
                    filteredList.push(biz)
                    continue
                }
            }
        }
        if(query.features){
            let features = query.features.split(',')
            for(let feat in features){
                if(new RegExp(feat, 'gi').test(biz.features)){
                    filteredList.push(biz)
                    continue
                }
            }
        }
    }
    return filteredList
}


function broadSearch(list,searchTerm){
    const filteredList = []
    for(let biz in list){
        if (new RegExp(searchTerm, 'gi').test(biz.name)){
            filteredList.push(biz)
            continue
        }
        if (new RegExp(searchTerm, 'gi').test(biz.city)){
            filteredList.push(biz)
            continue
        }
        if (new RegExp(searchTerm, 'gi').test(biz.address)){
            filteredList.push(biz)
            continue
        }
        if(scanCategories(searchTerm,biz.categories)){
            filteredList.push(biz)
        }
    }
    return filteredList
}
function scanCategories(searchTerm,categoriesList){
    for(let cat in categoriesList){
        if(cat.categoryName.toLowerCase()==searchTerm.toLowerCase()) return true
    }
    return false
}
