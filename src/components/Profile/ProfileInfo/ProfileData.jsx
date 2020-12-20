import githubIcon from './../../../imagas/github.png'
import emailIcon from './../../../imagas/E-mail.png'
import facebookIcon from './../../../imagas/Facebook.png'
import htmlIcon from './../../../imagas/HTML5.png'
import instagramIcon from './../../../imagas/Instagram.png'
import twitterIcon from './../../../imagas/Twitter.png'
import vkIcon from './../../../imagas/VK.png'
import youtubeIcon from './../../../imagas/Youtube.png'

import { React } from 'react';
import s from './ProfileInfo.module.css';


const ProfileData = ({ profile, }) => {
    return (
        <div>

            <div className={s.textInfoBlock}>
                {/* full name */}
                <div>
                    <b>Full name: </b>
                    {profile.fullName}
                </div>

                {/* aboutme */}
                <div>
                    <b>Abot me: </b>
                    {profile.aboutMe}
                </div>


                {/* job descriptoin */}
                <div>
                    <b>My professional skills: </b>
                    {profile.lookingForAJobDescription}
                </div>
                {/* jobb */}
                <div>
                    <b>Looking wor a job: </b>
                    {profile.lookingForAJob
                        ? 'yes'
                        : 'no'}
                </div>
            </div>

            <div className={s.contactsBlock}>
                <div className={s.innerContactsBlock}>
                    {profile.contacts.github && <a href={profile.contacts.github}>
                        <img src={githubIcon} alt="" />
                    </a>}
                    {profile.contacts.vk && <a href={profile.contacts.vk}>
                        <img src={vkIcon} alt="" />
                    </a>}
                    {profile.contacts.facebook && <a href={profile.contacts.facebook}>
                        <img src={facebookIcon} alt="" />
                    </a>}
                    {profile.contacts.instagram && <a href={profile.contacts.instagram}>
                        <img src={instagramIcon} alt="" />
                    </a>}
                    {profile.contacts.twitter && <a href={profile.contacts.twitter}>
                        <img src={twitterIcon} alt="" />
                    </a>}
                    {profile.contacts.website && <a href={profile.contacts.website}>
                        <img src={htmlIcon} alt="" />
                    </a>}
                    {profile.contacts.youtube && <a href={profile.contacts.youtube}>
                        <img src={youtubeIcon} alt="" />
                    </a>}
                    {profile.contacts.mainLink && <a href={profile.contacts.mainLink}>
                        <img src={emailIcon} alt="" />
                    </a>}
                </div>


            </div>
            {/* <div>

                {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitel={key} ContactValue={profile.contacts[key]} />
                })}
            </div> */}
        </div >
    )
}

export const Contact = ({ contactTitel, ContactValue }) => {
    return (
        <div className={s.contact}>
            <b>{contactTitel}: </b>{ContactValue}
        </div>
    )

}


export default ProfileData;