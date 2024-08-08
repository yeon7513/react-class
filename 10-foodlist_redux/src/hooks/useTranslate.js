import { useLocale } from '../contexts/LocaleContext';

const dict = {
  ko: {
    'confirm button': '확인',
    'cancel button': '취소',
    'edit button': '수정',
    'delete button': '삭제',
    'title placeholder': '이름을 입력해주세요.',
    'content placeholder': '내용을 입력해주세요.',
    'terms of service': '서비스 이용약관',
    'privacy policy': '개인정보 처리방침',
    'load more': '더보기',
    'newest button': '최신순',
    'calorie button': '칼로리순',
    'langs-ko': '한국어',
    'langs-en': '영어',
    'loading wait': '불러오는 중입니다. 잠시만 기다려주세요.',
  },
  en: {
    'confirm button': 'OK',
    'cancel button': 'Cancel',
    'edit button': 'Edit',
    'delete button': 'Delete',
    'title placeholder': 'Please Enter The Name.',
    'content placeholder': 'Please Enter Your Details.',
    'terms of service': 'Terms Of Service',
    'privacy policy': 'Privacy Policy',
    'load more': 'More',
    'newest button': 'Newest',
    'calorie button': 'Calorie',
    'langs-ko': 'Korean',
    'langs-en': 'English',
    'loading wait': 'Loading. please wait for a moment.',
  },
};

function useTranslate() {
  const locale = useLocale();
  const translate = (key) => dict[locale][key] || '';

  return translate;
}

export default useTranslate;
