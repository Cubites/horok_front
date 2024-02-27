import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './writeReview.css';
import MultiSelectComponent from './MultiSelectComponent';
import FileUploadComponent from './FileUploadComponent';

const ReviewModifyComponent = () => {
  const movePage = useNavigate();
  const location = useLocation();

  const [data, setData] = useState({});
  const [reviewId, setReveiwId] = useState(location.state.reviewId);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setReveiwId(location.state.reviewId);
    getWrittenReview(reviewId);
  }, [location.state]);

  // useEffect(() => {

  // }, [reviewId]);
  const handleMultiSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  useEffect(() => {
    handleFileUpload([data.image1, data.image2, data.image3]);
  }, [data]);

  const goBack = () => {
    //이전 페이지로 이동
    movePage(-1);
  };

  const getWrittenReview = (reviewId) => {
    axios
      .get(`${process.env.REACT_APP_DEV_URL}/api/reviews/edit/${reviewId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setData(res.data);
        handleFileUpload([res.data.image1, res.data.image2, res.data.image3]);
      })
      .catch((error) => {
        console.error('error!!! : ', error);
        //movePage("/login");
      });
  };

  const handleFileUpload = (images) => {
    //파일 정보 받아와 상태 설정
    setUploadedImages(images);
  };
  const submitForm = (formData) => {
    uploadedImages.forEach((image, index) => {
      formData.append('images', image);
    });

    axios
      .post(`/api/reviews/edit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data;',
        },
        withCredentials: true,
        baseURL: process.env.REACT_APP_DEV_URL,
      })
      .then((response) => {
        console.log('성공');
        movePage(`/myreview`);
      })
      .catch((error) => {
        console.log('error: ', error);
        //movePage('/login');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const reviewContent = form.querySelector(
      'textarea[name="reviewContent"]'
    ).value;
    formData.append('reviewContent', reviewContent);

    submitForm(formData);
  };

  // 라디오 버튼의 값이 변경될 때 실행되는 함수
  const handleRadioChange = (e) => {
    setData((prevData) => ({ ...prevData, reviewScore: e.target.value }));
    console.log(data.reviewScore);
  };
  return (
    <>
      <div className='backBtnArea'>
        <img
          src='/images/backArrow.png'
          className='backArrow'
          alt='backArrow'
          onClick={goBack}
          width='50'
        />
        <div className='backTxt'>이전</div>
      </div>
      <div className='writeReviewArea'>
        <form
          onSubmit={handleSubmit}
          method='POST'
          encType='multipart/form-data'
        >
          {/*리뷰아이디*/}
          <input type='hidden' value={reviewId} name='reviewId' />
          {/*결제 정보*/}
          <div className='payInfoArea card'>
            <div className='storeName'>{data.storeName}</div>
            <div className='payDate' name='payDate'>
              {data.payDate}
            </div>
            <hr></hr>
            <div className='priceArea'>
              <div className='priceHeader'>총 금액</div>
              <div className='priceVal' name='credit'>
                {data.credit}원
              </div>
            </div>
          </div>
          <div className='reviewImgArea card'>
            <FileUploadComponent
              className='fileUploader'
              onFileUpload={handleFileUpload}
              reviewId={reviewId}
              initialImages={[
                `${process.env.REACT_APP_DEV_URL}/show/image?imageName=${data.image1}`,
                `${process.env.REACT_APP_DEV_URL}/show/image?imageName=${data.image2}`,
                `${process.env.REACT_APP_DEV_URL}/show/image?imageName=${data.image3}`,
              ]}
            />
          </div>
          <div className='scoreArea card'>
            <div className='scoreTxt'>평점</div>
            <fieldset className='rating'>
              <input
                type='radio'
                id='star5'
                name='reviewScore'
                value='5.0'
                checked={data.reviewScore === '5.0'}
                onChange={handleRadioChange}
              />
              <label
                className='full'
                htmlFor='star5'
                title='Awesome - 5 stars'
              ></label>
              <input
                type='radio'
                id='star4half'
                name='reviewScore'
                value='4.5'
                checked={data.reviewScore === '4.5'}
                onChange={handleRadioChange}
              />
              <label
                className='half'
                htmlFor='star4half'
                title='Pretty good - 4.5 stars'
              ></label>
              <input
                type='radio'
                id='star4'
                name='reviewScore'
                value='4.0'
                checked={data.reviewScore === '4.0'}
                onChange={handleRadioChange}
              />
              <label
                className='full'
                htmlFor='star4'
                title='Pretty good - 4 stars'
              ></label>
              <input
                type='radio'
                id='star3half'
                name='reviewScore'
                value='3.5'
                checked={data.reviewScore === '3.5'}
                onChange={handleRadioChange}
              />
              <label
                className='half'
                htmlFor='star3half'
                title='Meh - 3.5 stars'
              ></label>
              <input
                type='radio'
                id='star3'
                name='reviewScore'
                value='3.0'
                checked={data.reviewScore === '3.0'}
                onChange={handleRadioChange}
              />
              <label
                className='full'
                htmlFor='star3'
                title='Meh - 3 stars'
              ></label>
              <input
                type='radio'
                id='star2half'
                name='reviewScore'
                value='2.5'
                checked={data.reviewScore === '2.5'}
                onChange={handleRadioChange}
              />
              <label
                className='half'
                htmlFor='star2half'
                title='Kinda bad - 2.5 stars'
              ></label>
              <input
                type='radio'
                id='star2'
                name='reviewScore'
                value='2.0'
                checked={data.reviewScore === '2.0'}
                onChange={handleRadioChange}
              />
              <label
                className='full'
                htmlFor='star2'
                title='Kinda bad - 2 stars'
              ></label>
              <input
                type='radio'
                id='star1half'
                name='reviewScore'
                value='1.5'
                checked={data.reviewScore === '1.5'}
                onChange={handleRadioChange}
              />
              <label
                className='half'
                htmlFor='star1half'
                title='Meh - 1.5 stars'
              ></label>
              <input
                type='radio'
                id='star1'
                name='reviewScore'
                value='1.0'
                checked={data.reviewScore === '1.0'}
                onChange={handleRadioChange}
              />
              <label
                className='full'
                htmlFor='star1'
                title='Sucks big time - 1 star'
              ></label>
              <input
                type='radio'
                id='starhalf'
                name='reviewScore'
                value='0.5'
                checked={data.reviewScore === '0.5'}
                onChange={handleRadioChange}
              />
              <label
                className='half'
                htmlFor='starhalf'
                title='Sucks big time - 0.5 stars'
              ></label>
            </fieldset>
          </div>
          <div className='reviewTxtArea card'>
            <div className='txtAreaHeader'>
              <img
                src='/images/noteIcon.png'
                className='noteIcon'
                alt='noteIcon'
                width='20'
              />
              리뷰를 작성해 주세요
            </div>
            <textarea
              name='reviewContent'
              cols='30'
              rows='7'
              placeholder={`리뷰는 신중하게 작성해주세요.
타인에게 불쾌감을 주는 리뷰는 통보없이 삭제될 수 있습니다.`}
              defaultValue={data.reviewContent}
            ></textarea>
          </div>
          <div className='selectBoxHeader'>추가할 공유폴더 선택</div>
          <div className='selectFoldersArea card'>
            <MultiSelectComponent
              reviewId={reviewId}
              onChange={handleMultiSelectChange}
            />
            <input
              type='hidden'
              name='folders'
              value={selectedOptions.join(',')}
            />
          </div>
          <input className='submitBtn' type='submit' value='작성완료' />
        </form>
      </div>
    </>
  );
};
export default ReviewModifyComponent;
