const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const productData = [
    {
        productName: 'The north face long sleeves 01',
        productDetail: 'สีขาว สภาพดีเยี่ยม',
        size: 'รอบอก 44 นิ้ว ยาว 26 นิ้ว',
        defect: 'none',
        price: 450,
        productTypeId: 1,
        mainImage: 'https://res.cloudinary.com/dgshg7vqk/image/upload/v1708092848/17080928442330_aeken9.jpg'
    },
    {
        productName: 'Mont bell long sleeves02',
        productDetail: 'สีดำ สภาพดี',
        size: 'รอบอก 44 นิ้ว ยาว 26 นิ้ว',
        defect: 'ปลายแขนข้างขวามีรอยถลอกเล็กน้อย',
        price: 350,
        productTypeId: 1,
        mainImage: 'https://res.cloudinary.com/dgshg7vqk/image/upload/v1708093137/17080931329040_iejvjx.jpg'
    },
    {
        productName: 'The north face jacket 01',
        productDetail: 'สีกรม สภาพเหมือนใหม่',
        size: 'รอบอก 50 นิ้ว ยาว 28 นิ้ว',
        defect: 'none',
        price: 650,
        productTypeId: 2,
        mainImage: 'https://res.cloudinary.com/dgshg7vqk/image/upload/v1708093306/17080933037641000000_hc9qus.jpg'
    },
    {
        productName: 'Columbia jacket02',
        productDetail: 'สีครีม สภาพดีเยี่ยม',
        size: 'รอบอก 44 นิ้ว ยาว 28 นิ้ว',
        defect: 'มีรอยรูไฟเล็กน้อยบริเวณด้านหลัง',
        price: 590,
        productTypeId: 2,
        mainImage: 'https://res.cloudinary.com/dgshg7vqk/image/upload/v1708093403/17080934009380_yiyj1b.jpg'
    },
    {
        productName: 'Columbia trousers01',
        productDetail: 'สีเขียว สภาพเหมือนใหม่',
        size: 'รอบเอว 34 นิ้ว ยาว 28 นิ้ว',
        defect: 'none',
        price: 590,
        productTypeId: 3,
        mainImage: 'https://res.cloudinary.com/dgshg7vqk/image/upload/v1708093541/17080935393991000000_ehgvsw.jpg'
    },
    {
        productName: 'Mont bell long sleeves02',
        productDetail: 'สีกรม สภาพดีเยี่ยม',
        size: 'รอบเอว 30 นิ้ว ยาว 28 นิ้ว',
        defect: 'none',
        price: 590,
        productTypeId: 3,
        mainImage: 'https://res.cloudinary.com/dgshg7vqk/image/upload/v1708093605/17080936016531000000_ivg9gf.jpg'
    }

];

async function run() {
    await prisma.product.createMany({ data: productData });
}

run()