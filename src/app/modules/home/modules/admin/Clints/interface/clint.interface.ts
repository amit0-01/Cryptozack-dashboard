export interface clintRequestData {
    pagination: {
        pageNo: any;
        pageSize: any;
    },
    filter: {
        text: string;
    },
    filterData?:FilterData,
   dateRange?:DateRange
}
export interface clintRequestsData {
    pagination: {
        pageNo: number;
        pageSize: number;
    },
    filter: {
        text: string;
    },
   
//    dateRange?:DateRange
}

export interface FilterData{
    
        planName?:string,
        state?:string,
    
}
export interface DateRange{
    to?:string;
    from?:string;
}

export interface clintRes {
    currentPage: number;
    hasNext?: number;
    matching?: number;
    pageSize: number;
    total: number;
    getCopons:responceGetCoupons[]
}

export interface responceGetCoupons{
    length: number;
    country:string;
    companyName:string;
    name:string;
    email:string;
    signupDate:string;
    phoneNumber:string;
    daysLeft:number
    state:string
    planName:string
    platForm:string
    TotalVisitor:number
    ExpireDate:string
    LatestCheckIn:checkin
    clintData:clintRequestData[]
}
export interface checkin{
    latestCheckIn:string
}