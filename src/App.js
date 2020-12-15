import { createRef, useRef, useState } from "react";
import styled, { css } from "styled-components";

import "./App.css";
import { Header } from "./Header";

const Image = styled.img`
  ${(props) =>
    props.isHorizontal
      ? css`
          width: 100%;
          height: auto;

          @media screen and (orientation: landscape) {
            height: 100vh;
            width: auto;
          }
        `
      : css`
          height: 100%;
          width: 100%;

          @media screen and (orientation: landscape) {
            height: 100vh;
            width: auto;
          }
        `}
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  overflow: scroll;
  position: relative;

  @media screen and (orientation: portrait) {
    flex-direction: column;
  }
`;

const BackToTop = styled.button`
  border: none;
  padding: 10px 25px;
  font-family: monospace;
  background: #191919;
  color: white;
`;

const host = "http://192.168.178.42:8080";
const images = [
  `${host}/ch-pool-boy-896W%20copy.jpeg`,
  `${host}/ch-thomas-mobile.png`,
  `${host}/ch-pool-boy-414W.jpeg`,
  // "https://lh3.googleusercontent.com/fife/ABSRlIp-MFIUMLznjw_le1nqsXBuc2rCSjMugKT8EbmTtM54i5xHcW-6-XIjqceV31GX0rKbyNDq-uR39P67vGE2kvPlKmpRJ0Kt6xG11q5L384wq94CQkLuFQeI5acyc5Atz6Ab11vwCLGPtCJTxiIFSVLk5hDXtDibF3aA-flouPSpAogspq707k8Je4TRF9y1PH28_WGpVj7nkQcVmTfhZ9PsZVWONeGbILzCkY2V_80Df9X3AspnA9QUSjreT2_d9fOS8usac8UisFOcSMNBgGbndBxNhM1rf0xU0dDFqip8MEpk1nbFTvWF5Q_0Qz94Beg4uAWCq7qptsxnEbkG_FQ8NN3EyjYReC3umxE4WuAlmT5p0bZkJvuRfsznygio49pWDBXWpQZCAmynl00ZOhGusSDHJyh9N4XmVb5MdRlgjLekLHmPLRY7ekOHyr3_jmbW35AWG4RsYibkkcG49cLWEfFXc5qieYDCOd032brIlxwFlNNEYj6qGCFRx43njILIUZwTt9fnavG9tzXCjgBRnzPgX388-iNzE6LK1Y_fVBNQOjBODynFakY717MsSMWpVarGy-s4lUpQLN68LWkHUX1Ie8sFAyL7Rc4xsVWzoDV7sbiYn0PAFySOSZduCU9Mbfh-nsxu0vwJzIkNxL7yll7uXIZO59l2FZPvNJ_K5xi1lm_UrLvwSxloePZ64A0ZgN9_uqAXAU0riV9OS_Zfkl3LxXqw_2E=w2000-h3704-ft",
  // "https://lh3.googleusercontent.com/fife/ABSRlIq8USNTOjWmJYlU3DFX7EekclCdmA5Vhu_erdFTaXqlv1ckIUl1P_F2-dPAQW-ssCb1hCmWDk4oWRClDNxGKUco1gHqE6P3UVGqZfpXJgM_kusgNE7FTqg2XVc7stBZ7ACjmgP1lanUqJV7MuHcTcV0pK-Dua9TDcA4ToCX7E77rQuAIpBDRb2b3RGh9xUEJUNcAAefzFUKYFtE-DUquv75iFLPy4LtX4GzuEuhqfv7g6BFaqyFQMnMOB5QuF0ev7XIibzXIBMyCiry3U6c1Ly6wFvYAsDbgJ8Rk2PdRIvcOPgnFmtV-abafnsQNwn3AYPKVvqVz2sJD40kiCL9E7BiOU11molIKOJ7agtzXs30-17tZApPfleV120oMYsqlqiJWLvvs5wwemX_5nhtehpuHRZEVohHZ9tPo8OlQKIX2QZLPAkkMAVaHt5WaPV-TuROlB7N34obUSMJdIg54Vziitn1w2tR613wRGXnLwRcL57UDGS1a5L0UOL_VU70nDJRpxW9q4n6XyJm_rS033Ezy3kAkfT5k5rllVxzh6I6XFKXXb4pbjWIVgrrfBnC1eLvWK2KjbCjreCM3fUslOzB-_aG5t_3Zmcb8KXoCDVROMmSxu1jz1-y7WUVsevjU-Dmir2OzOMfq-HcwoHzB1-OaVo4pZCbD_bxEHWq7-U8DMRrXMaCoVnrCKwRP-Q2TC2mwDoHncroAk_fqwOPy1BI3V3H5HpGMNQ=w3360-h1656-ft",
  // "https://lh3.googleusercontent.com/fife/ABSRlIonNETk-RbOaoqelBywc2mOx8v25SoDn3XHqT-QAiwD8EpWgbdm2zUZ89aHNyDC8dKO8gvreXwhbQUudvlZOejJpgV6whHAMKdcLdauquayLw5pjqTGX0uGqBjxQQlb25iTGqBPEGom8DfZDOd5xIUXCaYXD33i94AgDwQW54BotoOTQyHVIzX2G6fGaHTmbQQABv8hHkq8z5V3BNjdwwmGHQmjHHl7WQnUL_Lt4iP5wAPvGGWo7I_GiWm8sfddcZtCft9Y6xw0bVQQB5NJkTHXLvqd8-xj8gjJ7Kd0hwrNuTKoy1umLmkORWzeMaiGLcUKX9eO-x1-kXKIzGJc_XZZrEzUpNP9njHymAEMAgqxwNpggS1BPNqKm8UA0yEjXQqzkClUTR1L_wAEW1geWyRo-stCa-2lfAjZ8vsGo21teYSTJSzWWNCVNgwXmb2DuP3-qiz_dc2eEy-594pzgvsO3dDcr0oaCN-wWZMxL6hlDR-3ORKtskzU-BfggPxmjFv2F4JpQuqwJmW34MZXF5qggEcc0ghIePGcD8ovmLP7EqHaqsZiyCKeOuVPmjDm-gUQ3iAe7CDHgq-dmcYhfr-nOTVj-ae7JNkhayLSUmJgvRTWNuOGYHKyHFnECnGX6qS61czbQvkgJQv3-SzVG7dYZU3mZduY18WPQY46uYxrgicqa8Mt6rUau0DuN_d8LTfQe5syInHRtHjA2PwPTgb6blPHatioxn8=w3360-h1656-ft",
  // "https://lh3.googleusercontent.com/fife/ABSRlIr8hfURgXA1KxWNtP2v63aCoYw7-GJXSMlvA3JBo5Mlw_kwKeGx1Qx_-q1riEKuFDhEWIYRnvkObTgqzr8uBZaOTRorS1NGC8YEuyA1nXpY3Q9RWwiX6uYA1LlkrZmk_FBfdm-oUdJaqXYFVNPljqKT0oRaZiXl63HhBHxvc5VTKasaExM1y5nGxzXn6vAczvt1fqfeFz8LsecpFfYXh6qsCgH_G_m8YHKHafE9V6Us5dxmD5kYnO6TjFpxZPGdO9vre6PM76Nfgh7gJnBRCTYmLEHb4AER1XXQiEXNhS9RScSv3PynwH9rJqwxEXkfqOobdP2Xk0WvPmrLw_SIGLslWqgIAmFrLsdF9LLCArKrH3_0prMKsjQkRkitKMaPxwlljW6LKqksa-Uxel7v6MOpYJPIiqna_eStjakIvs1GefJia-0q_cvq8PO_G76lvC2iMquzee29vNUrFBf9IT8ED1QRmghYBb3F6-ytZFhHZhVyly0L_AUCWELvJvkMBi6EuB88QNRHPdIVK9I5-LYtCM0Lmqj2GP_nBLlMjsCUg8d1Asp15Kfppg8iq6yaOScBQnTETp7D8NI-wW8EqPtA0oCUANtOOXEeQq4YDt5APhUtirbRExZ7lo9jet6XxeVXS-hwgzR39JQjTYHEu45104WpOqSly37AMyam3O13w9mnzZpnkcx3YOXHGDeyJUkgyaV5ArRsm3-Wtty552FzPe2hH7NGM7I=w2000-h1360-ft",
  // "https://lh3.googleusercontent.com/fife/ABSRlIpswxFJjtx-YBnDOr311EskbwiSQjFVB-xczlHsO9YCKozud-EpWW71CXHoTcd0bxeevEWi9xrl2vhjMgn_q44KBGoSYHqoK8Gw1CPT1bIiSVfc0LNIghTKEefkoLXhwC3abmswROSOBTzse-OQa3LMwSpkeLWtCkxglmcWzezq0N-2SFCtqwkQugxZDZc9u_UeoJbY-GwghuOc2wkg5ovpxHfcgWj781DDSCAjCkTfg_6HhPk1wsGuS7Bi44fshCrUFPksALsf4b2XPgJRkQNDPX3kghCfKtwWy9IK-Hj_eSEv9WfoHw1eDQIDJ3eaMskpqXFe7PfyDxdC56mmITGqS91_pWr88gKIIrWLGVEykaAB7vlzodQ27T1cpiePCJ-tDStRMRNCstFN_TLkq3dq0aCxzWzg9x3j4R3xDyZJZro-jP6iZeaq6cl7-1baE8ujuAoNvCFYTXbugjQAd5tU3L39tn6jrghNsCFC8e47cTjvnxbLlifq6iTVy_Gun3zx5sOBG-Q6AQl-_8JQuJ9iCxkmCE5d6-d-TJJxwoAeWmoBOuydld3hdBx3ddjfPlfmUvGHBmZlzhf7mYcUlMJ0Had86Gy8W9so6-LyE0rgfk_1wRw4l9VhsbUdTkVHynThEw-UCCv318DAs53E4ly3ZYob9nUPwzXtSgP7fI1teSlj6C3mDNiut0Hpvt7nUxEhhQZ7qgjSVka9X4x0UAtVS6EOzbO3pLQ=w3360-h1656-ft",
  // "https://lh3.googleusercontent.com/fife/ABSRlIr30yOXDfob_7HZfJ8_QXTnASxfjB_S14riCav3X2lYu-dQ1cYsc0OLzsPQDsb04DqIY129EmgG5AIvdhIMF_9y9-6FYqjwnfD9TBchzuktmNs20PUhYY_VKQYd4nCth7UPWEcdGVL-AKnmuFf3uaw6EBR_N2PCqTRWpFnUiR-M6wclrMhAZHFd3K4EljY3VmA74HJxy7H2JGM-uRld2OrgeCRbBqb_uEguyZIPTIKMmv2Haj1l-5hSPYv0GDg2ZHlCYfXTYmda85yqUAf4xeyaUOVgorf3-dHcpREMH0-khL8TuiJsjy4v0ctEEkDypr6EBqaStaLpGNH_rZCzXRMB59OHDGLgSFxciBGHQzUzrZKL7SnU9Zjwqlgzu7_WMdAKffI8KZ-vbGqQr00bU8vUL8QzI1v2Vm3LCr8VCs3W6vk27pC2Z9TpGB169WV6CIkWkIVsOowfUcrY1lsMdc4lBOnMu_m7-6klcjbGqVHjC5EnzYf6p3z0d_HPpGz6pNr6ThpPhRS38pI67E5Q5uRxler2aHc6qSpdSy4mJgJ5MmvSyKqT5QU49LffsJFmBkMYmj3yGVlC5frgP22wf5p30zQzMfl7vAQbgILzBGYrTX1KJu8VMW4vStCt87MKNi26XXBXEBREVDbIGAe2-dC6NR4r-Jt9rnXfUK5TxwQCIfRst6gF30PDp565akfnCvyha88BgyCPLa0zrTiRkcN4YjpDkikEhuk=w3360-h1656-ft",
];

const ImageList = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  position: relative;
  list-style: none;
  height: 100%;

  @media screen and (orientation: portrait) {
    flex-direction: column;
  }
`;

const ImageItem = styled.li`
  display: contents;
`;

const ImageLoader = ({ imageRef, scrollIntoView, url }) => {
  const [isHorizontal, setIsHorizontal] = useState(false);

  const onImageLoad = () => {
    if (
      imageRef &&
      imageRef.current &&
      imageRef.current.naturalWidth >= imageRef.current.naturalHeight
    ) {
      setIsHorizontal(true);
    }
  };

  return (
    <Image
      onLoad={onImageLoad}
      isHorizontal={isHorizontal}
      ref={imageRef}
      onClick={() => scrollIntoView(imageRef)}
      src={url}
    />
  );
};

function App() {
  const imageRefs = [];
  const headerRef = useRef(null);

  images.forEach(() => imageRefs.push(createRef(null)));

  function scrollIntoView(ref) {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }

  function scrollToTop() {
    scrollIntoView(headerRef);
  }

  return (
    <Wrapper>
      <Header headerRef={headerRef} />
      <ImageList>
        {images.map((url, index) => {
          const imageRef = imageRefs[index];

          return (
            <ImageItem>
              <ImageLoader
                key={index}
                url={url}
                scrollIntoView={scrollIntoView}
                imageRef={imageRef}
              />
            </ImageItem>
          );
        })}
      </ImageList>
      <BackToTop onClick={scrollToTop}>Back to start</BackToTop>
    </Wrapper>
  );
}

export default App;
