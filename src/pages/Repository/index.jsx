import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Container, Owner, Loading, BackButton, IssuesList, PageActions, IssuesSection } from './styles';
import { FaArrowLeft } from 'react-icons/fa';

import api from '../../services/api';
import axios from 'axios';

export function Repository() {
  const URLRepoData = useParams();

  const [repositoryData, setRepositoryData] = useState({});
  const [repositoryIssues, setRepositoryIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const controller = new AbortController();
    const abortSignal = controller.signal;

    async function requestRepoData() {
      const repositoryName = URLRepoData.repository_name;

      try {
        const [repositoryDataRequest, repositoryIssuesRequest] = await Promise.all([
          api.get(`/repos/${repositoryName}`, { signal: abortSignal }),
          api.get(`/repos/${repositoryName}/issues`, {
            signal: abortSignal,
            params: {
              state: 'all',
              per_page: 5
            }
          }),
        ]);

        setRepositoryData(repositoryDataRequest.data);
        setRepositoryIssues(repositoryIssuesRequest.data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled');
        }
      }
    }

    requestRepoData();
    return () => controller.abort();
  }, [URLRepoData.repository_name]);

  // Update issues list after page is changed
  useEffect(() => {
    const controller = new AbortController();
    const abortSignal = controller.signal;

    async function requestNewPageOfIssues() {
      const repositoryName = URLRepoData.repository_name;

      try {
        const repositoryIssuesRequest = await api.get(`/repos/${repositoryName}/issues`, {
          signal: abortSignal,
          params: {
            state: filter,
            page: currentPage,
            per_page: 5
          }
        });

        setRepositoryIssues(repositoryIssuesRequest.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Issues request canceled');
        }
      }
    }

    requestNewPageOfIssues();
    return () => controller.abort();
  }, [URLRepoData.repository_name, currentPage, filter]);

  function handlePage(action) {
    switch (action) {
      case 'next':
        setCurrentPage(previous => previous + 1);
        break;
      case 'prev':
        setCurrentPage(previous => previous - 1);
        break;
    }
  }

  function handleFilter(selectedFilter) {
    setFilter(selectedFilter);
  }

  if (loading) {
    return (
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    );
  }

  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft color="#000" size={30} />
      </BackButton>

      <Owner>
        <img
          src={repositoryData.owner.avatar_url}
          alt={repositoryData.owner.login}
        />
        <h1>{repositoryData.name}</h1>
        <p>{repositoryData.description}</p>
      </Owner>

      <IssuesSection>
        <div>
          <strong>Filters:</strong>
          <button onClick={() => { handleFilter('all') }} disabled={filter === 'all'} style={{ backgroundColor: '#aa820d' }} type="button">All</button>
          <button onClick={() => { handleFilter('open') }} disabled={filter === 'open'} style={{ backgroundColor: '#00d062' }} type="button">Open</button>
          <button onClick={() => { handleFilter('closed') }} disabled={filter === 'closed'} style={{ backgroundColor: '#b9250d' }} type="button">Closed</button>
        </div>
        <IssuesList>
          {repositoryIssues.map(issue =>
            <li key={`${issue.id}`}>
              <img
                src={issue.user.avatar_url}
                alt={issue.user.login}
              />

              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>

                  {issue.labels.map(label =>
                    <span key={`${label.id}`}>{label.name}</span>
                  )}
                </strong>

                <p>{issue.user.login}</p>
              </div>
            </li>
          )}
        </IssuesList>
      </IssuesSection>

      <PageActions>
        <button
          type='button'
          onClick={() => handlePage('prev')}
          disabled={currentPage < 2}
        >
          Prev
        </button>

        <button type='button' onClick={() => handlePage('next')}>
          Next
        </button>
      </PageActions>
    </Container>
  );
};