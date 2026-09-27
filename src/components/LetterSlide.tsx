import React, { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

export function LetterSlide() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atBottom, setAtBottom] = useState(false);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 16;
    setAtBottom(isBottom);
  };

  const handleChevronClick = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (atBottom) {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({ top: 140, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-[390px] sm:h-[405px] bg-white flex flex-col overflow-hidden">
      {/* Scrollable Letter Content */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="letter-scroll flex-1 overflow-y-auto px-5 pt-5 pb-11 text-left select-text"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {/* Letter Header */}
          <h2 className="text-[15px] leading-[1.55] font-bold text-[#1e293b] pb-3.5 mb-3.5 border-b border-[#e2e8f0]">
            For Davina Radyanka The Person
            <br />
            That So Beautiful And Amazing
          </h2>

          {/* Letter Body Paragraph 1 */}
          <p className="text-[14.5px] leading-[1.88] text-[#334155] font-normal tracking-[0.005em]">
            ciee ada yang ultah hahahaha udhn dlu ahk ngambeknya tapi yang
            kemaren si jujur parah ya ...🙄, Selamat ulang tahun ya Davina
            semoga lu sehat sehat selalu dan semua doa doa yang lu panjatkan
            semuanya terkabul, serta wihslist² lu bisa tercapai semua doa terbaik
            untukmu gw selalu ngedoain lu kok di setiap langkah yang lu tempuh
            anjayy kata katanya rada puitis ya hahahaha,gww mau bilang makasih
            yang sebanyak banyak nya karena selama setahun ini luu udahh sangatt
            berpengaruh terhadap hidup gw dan lu juga bikin hari² gw lebih
            berwarna , luu tau ga si kalo lu sadar skrng gw udh ga main game
            lagi hahaha salah satu faktor nya ituu juga karena lu, KOK BISA??
            karena pas sama lu gw sadar kaloo game itu bener² ngasih dampak
            yang negative buat gw dan kenyataanya juga begitu, karena gw kalo
            udh main game jadi lupa waktu terus kehilangan kontrol sama diri
            sendiri dan itu bener bener negative dan juga gw ngeliat lu kaya
            fokus banget sama pelajaran dan masa depan TAPII ammar yang di kelas
            9 awalll bener bener ga mikirin ituu??? Makanya itu gw berubah dan
            ada banyak perubahan sebenarnya dan ga mungkin gw sebutin satu² yaa
            kalo lu liat skrng ini lah ammar yang udah bener² berubah 360
            derajat, sadar ga sadar kalo dibandingin ammar yang dulu dikelas 8
            sama yang skrng bener bener beda banget, butt yaa semua perubahan
            yang gw lakukan semuanya bertujuan untuk menjadi pribadi yang lebih
            baik lagi dan positive bukan sebaliknya, gw juga selalu memperbaiki
            diri biar bisa pantes buat diri lu, sebagai pasangan PRENKK
            maksudnya sebagai temen harus setara kan kalo yang satu productive
            yang satunya juga dongg biar sama² berkembang dan bisa sama²
            bertumbuh menjadi pribadi yang lebih baik hahahah,
          </p>

          {/* Letter Body Paragraph 2 */}
          <p className="mt-5 text-[14.5px] leading-[1.88] text-[#334155] font-normal tracking-[0.005em]">
            sekali lagi selamat ulangg tahun yaa davv semangatt terus yaa gw ga
            tau lu buka ini kapan tapii gw mau ngucapin SEMANGATTT KSRR DAN
            ULANGAN NYA gww yakinn lu pasti bisa gw bakal selalu ngesupport dan
            ngedoain lu dari jauhh soo SEMANGATTTT TERUSS DAVINAA💙🩵
          </p>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade + Down Chevron Indicator (Matches Video 00:13 - 00:19) */}
      <button
        type="button"
        onClick={handleChevronClick}
        aria-label="Scroll surat"
        className="absolute bottom-0 left-0 right-0 h-9 bg-gradient-to-t from-white via-white/95 to-transparent flex items-end justify-center pb-1.5 cursor-pointer focus:outline-none"
      >
        <motion.div
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown
            className={`w-4 h-4 text-[#64748b] transition-transform duration-300 ${
              atBottom ? 'rotate-180' : ''
            }`}
          />
        </motion.div>
      </button>
    </div>
  );
}
