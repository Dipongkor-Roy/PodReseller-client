/* eslint-disable react/prop-types */

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import ProductCategory from '../../components/ProductCategory/ProductCategory';
const CategoryDisplayTab = ({item}) => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      };
    return (
        <div>
            <div>
        <Swiper
          pagination={pagination}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="mx-[20px] grid grid-cols-2">
              {item.map((item) => (
                <ProductCategory key={item._id} product={item}></ProductCategory>
              ))}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
        </div>
    );
};

export default CategoryDisplayTab;