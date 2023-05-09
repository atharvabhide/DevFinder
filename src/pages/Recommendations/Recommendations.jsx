import React from 'react'
import styles from './Recommendations.module.css'
import { DevCard } from '../../components/DevCard/DevCard'

export const Recommendations = () => {
  return (
    <>
        <div className={styles.header}>
            Recommended Developers
            
        </div>  
    <div className={styles.developers}>
        <DevCard 
            name="ak"
            position="Frontend developer"
            bio="Another productive way to use this tool to begin a daily writing routine. One way is to generate a random paragraph with the intention to try to rewrite it while still keeping the original meaning. The purpose here is to just get the writing started so that when the writer goes onto their day's writing projects, words are already flowing from their fingers."
        />
        <DevCard 
            name="ak"
            position="Frontend developer"
            bio="Another productive way to use this tool to begin a daily writing routine. One way is to generate a random paragraph with the intention to try to rewrite it while still keeping the original meaning. The purpose here is to just get the writing started so that when the writer goes onto their day's writing projects, words are already flowing from their fingers."
        />
        <DevCard 
            name="ak"
            position="Frontend developer"
            bio="Another productive way to use this tool to begin a daily writing routine. One way is to generate a random paragraph with the intention to try to rewrite it while still keeping the original meaning. The purpose here is to just get the writing started so that when the writer goes onto their day's writing projects, words are already flowing from their fingers."
        />
        <DevCard 
            name="ak"
            position="Frontend developer"
            bio="Another productive way to use this tool to begin a daily writing routine. One way is to generate a random paragraph with the intention to try to rewrite it while still keeping the original meaning. The purpose here is to just get the writing started so that when the writer goes onto their day's writing projects, words are already flowing from their fingers."
        />
        <DevCard 
            name="ak"
            position="Frontend developer"
            bio="Another productive way to use this tool to begin a daily writing routine. One way is to generate a random paragraph with the intention to try to rewrite it while still keeping the original meaning. The purpose here is to just get the writing started so that when the writer goes onto their day's writing projects, words are already flowing from their fingers."
        />
        <DevCard 
            name="ak"
            position="Frontend developer"
            bio="Another productive way to use this tool to begin a daily writing routine. One way is to generate a random paragraph with the intention to try to rewrite it while still keeping the original meaning. The purpose here is to just get the writing started so that when the writer goes onto their day's writing projects, words are already flowing from their fingers."
        />
        
    </div>
    </>

  )
}
