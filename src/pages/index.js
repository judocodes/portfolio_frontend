import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
// Components
import { Contact } from '../components/Contact';
import { SocialLinks } from '../components/SocialLinks';
import { MusicHobby } from '../components/MusicHobby';
import { Writing } from '../components/Writing';
import { Projects } from '../components/Projects';
import { WelcomeMessage } from '../components/WelcomeMessage';
import { NodesPreview } from '../components/NodesPreview';
import { graphql } from 'gatsby';
import { ContactForm } from '../components/contact-form/ContactForm';
import { Context } from '../components/Context';

import styled from 'styled-components';

var IconStyles = styled.div`
    margin-top: 2.5rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 1rem;
    row-gap: 1rem;
    justify-items: center;
    padding: 0 5rem;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        column-gap: 4rem;
        padding: 0 2rem;
    }
`;

export default function Index({ data = {} }) {
    var [{ showProjects, showContact, showPosts }, dispatch] = useContext(
        Context
    );
    var posts = data.allSanityPost?.nodes || [];
    var projects = data.allSanityProject?.nodes || [];

    return (
        <>
            <Helmet>
                <meta charset="utf-8" />
                <title>Jules' Portfolio</title>
                <link rel="canonical" href="http://jules.codes" />
            </Helmet>
            <WelcomeMessage />
            <IconStyles>
                <Projects updater={updater('projects')} isOpen={showProjects} />
                <Writing updater={updater('posts')} isOpen={showPosts} />
                <MusicHobby />
                <Contact updater={updater('contact')} isOpen={showContact} />
            </IconStyles>
            {showProjects && <NodesPreview nodes={projects} />}
            {showPosts && <NodesPreview nodes={posts} />}
            {showContact && <ContactForm updater={updater('contact')} />}
            <SocialLinks />
        </>
    );

    function updater(string) {
        return () => {
            if (string == 'posts') {
                dispatch({ type: 'togglePosts' });
            } else if (string == 'projects') {
                dispatch({ type: 'toggleProjects' });
            } else if (string == 'contact') {
                dispatch({ type: 'toggleContact' });
            }
        };
    }
}

export const pageQuery = graphql`
    query {
        allSanityPost {
            nodes {
                title
                mainImage {
                    asset {
                        fluid(maxWidth: 400) {
                            ...GatsbySanityImageFluid
                        }
                    }
                    alt
                }
                id
                slug {
                    current
                }
                publishedAt
            }
        }
        allSanityProject {
            nodes {
                title
                mainImage {
                    alt
                    asset {
                        fluid(maxWidth: 400) {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
                id
                slug {
                    current
                }
            }
        }
    }
`;
