var dataset1 = [
{
    "value": "129",
    "time": "1452121215"
},

{
    "value": "149",
    "time": "1454221215"
},
{
    "value": "159",
    "time": "1454321215"
},

{
    "value": "169",
    "time": "1455070015"
},

{
    "value": "189",
    "time": "1462000015"
},
{
    "value": "209",
    "time": "1464121215"
},
{
    "value": "199",
    "time": "1472070015"
},

];

var dataset2 = [
{
    "value": "1292",
    "time": "1452121215"
},

{
    "value": "1021",
    "time": "1454121215"
},
{
    "value": "171",
    "time": "1462021215"
},


{
    "value": "209",
    "time": "1462170015"
},
{
    "value": "172",
    "time": "1462190215"
},
{
    "value": "500",
    "time": "1464190215"
},
{
    "value": "500",
    "time": "1464300215"
},

{
    "value": "1029",
    "time": "1464400015"
},
{
    "value": "709",
    "time": "1464521215"
},
{
    "value": "299",
    "time": "1472070015"
},

];

var campaignSet = [
    {
        "name": "Campaign One",
        "key": "cmpgn_one",
        "order": 1,
        "dates": [
            {"start": 1452121215, "end": 1454121215},
            {"start": 1456221715, "end": 1456721215},
            

        ]
    },
    {
        "name": "Campaign Two",
        "key": "cmpgn_two",
        "order": 1,
        "dates": [
            {"start": 1453832215, "end": 1456333215},
            {"start": 1466431715, "end": 1466731215},
            

        ]
    }

]


module.exports = {
	dataset1:dataset1,
	dataset2:dataset2,
	campaignSet:campaignSet
}