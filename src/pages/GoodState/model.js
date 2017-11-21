export class Model {
    constructor(props) {
        this.Id = props.i;
        this.OrderId = props.oi;
        this.SubIndex = props.si;
        this.PackCount = props.pc;
        this.Currency = props.c;
        this.Price = props.p;
        this.OriginalPrice = props.po;
        this.Delivery = props.pd;
        this.Weight = props.pw;
        this.qty = props.pq;
        this.OtherPrice = props.pt;
        this.Insurance = props.pi;
        this.InsuranceAUD = props.pu;
        this.IsPickup = props.u;
        this.IsOnsite = props.io;
        this.MemberRemark = props.m;
        this.AttachNumber = props.at;
        this.OrderStatus = props.o;
        this.PackStatus = props.ps;
        this.DeliveryStatus = props.ds;
        this.CreateTime = props.t;
        this.OrderGoodsItems = props.go;
        this.Receiver = props.r;
        this.Sender = props.s;
        this.Packs = props.pks;
        this.balance = props.balance;
    }
}

export const DeliveryStatus = {
    Default: '未生效',
    WaitForPicking: '等待快递上门取件',
    PickedByDriver: '快递员已揽件',
    TakeOff: '已发往中国',
    Clearing: '清关中',
    Delivering: '清关完毕，转运或派送中',
    Deliveried: '已送达，已收件，完毕'
}
export const DeliveryColor = {
    Default: '#bfbfbf',
    WaitForPicking: '#f78e3d',
    PickedByDriver: '#f78e3d',
    TakeOff: '#49a9ee',
    Clearing: '#49a9ee',
    Delivering: '#00a854',
    Deliveried: '#00a854'
}
export const stockState = {
    NotForSale: '已下架',
    OutStock: '无货',
    ByStock: '按库存',
    ByBook: '可预订',
    InStock: '有货'
}

export const itemState = {
    Cancelled: '已取消',
    Ready: '已配货',
    OutStock: '缺货',
    WaitForBooking: '等待预订',
    WaitingForProcess: '待处理',
    Default: '未生效',
    Booked: '已预订'
}

export const orderState = {
    Cancelled: '已取消',
    NotConfirmed: '待确认',
    NotPaid: '待支付',
    Paid: '已支付',
    Finished: '已完成'
}

export const orderColor = {
    Cancelled: '#919191',
    NotConfirmed: '#e09a00',
    NotPaid: '#f46e65',
    Paid: '#108ee9',
    Finished: '#00a854'
}
export const itemStateColor = {
    Cancelled: '#919191',
    Ready: '#49a9ee',
    OutStock: '#f5317f',
    WaitForBooking: '#f56a00',
    WaitingForProcess: '#948aec',
    Default: '#f46e65',
    Booked: '#00a854'
}

export const PackStatus = {
    Cancelled: '已取消',
    Ready: '已配货',
    WaitingForReview: '等待审核',
    WaitingStock: '备货中',
    WaitingForProcess: '待处理',
    Default: '未生效',
    Pending: '配货中',
    ReadyToShip: '代发走',
    ReadyToPickup: '待提货',
    Shipped: '已发货',
    Picked: '已提走'
}
export const PackStatusColor = {
    Cancelled: '#919191',
    Ready: '#49a9ee',
    WaitingForReview: '#49a9ee',
    WaitingStock: '#948aec',
    WaitingForProcess: '#948aec',
    Default: '#f46e65',
    Pending: '#948aec',
    ReadyToShip: '#948aec',
    ReadyToPickup: '#948aec',
    Shipped: '#00a854',
    Picked: '#00a854'
}