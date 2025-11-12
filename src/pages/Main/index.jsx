import { useCallback, useEffect, useState } from 'react';
import { Container, DeleteButton, Form, List, SubmitButton } from './styles';
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
import api from '../../services/api';
import { Link } from 'react-router';

export function Main() {
  // Dummy data for tests pourpose
  const useDummyData = false;
  const dummyData = useCallback(() => {
    return [
      { name: 'facebook/react' },
      { name: 'facebook/zstd' },
      { name: 'angular/angular' }
    ];
  }, []);

  const localStorageKey = '@repositories';
  const useLocalStorageData = true;

  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState(() => {
    if (useLocalStorageData) {
      const itensOnLocalStorage = localStorage.getItem(localStorageKey);
      try {
        const parsedItensToList = JSON.parse(itensOnLocalStorage);
        return parsedItensToList;
      } catch (error) {
        console.log(error);
        return [];
      }
    }

    if (useDummyData) return dummyData();

    return [];
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setLoading(true);

    async function requestRepo() {
      try {

        const isNewRepoEmpty = newRepo === ''
        if (isNewRepoEmpty) {
          throw new Error('Você precisa indicar um repositório!');
        }

        const alreadyContainsRepo = repositories.find((repo) => repo.name === newRepo);
        if (alreadyContainsRepo) {
          throw new Error('Repositório já adicionado!!');
        }

        const response = await api.get(`repos/${newRepo}`);
        const data = {
          name: response.data.full_name
        };

        setRepositories(old => [...old, data]);
        setNewRepo('');

      } catch (error) {
        setAlert(true);
        console.log(`Error ocurred during requisition: ${error}`);

      } finally {
        setLoading(false);
      }
    }

    requestRepo();
  }, [newRepo, repositories]);

  const deleteRepositoryFromList = useCallback((repoName) => {
    setRepositories(old => {
      return old.filter(currRepo => currRepo.name != repoName)
    });
  }, []);

  // If a bad input generated an alert, remove it if the input changes.
  useEffect(() => {
    if (alert) {
      setAlert(false);
    }
  }, [newRepo]);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(repositories));
  }, [repositories]);

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositorios:
      </h1>

      <Form onSubmit={handleSubmit} $error={alert}>
        <input
          type="text"
          placeholder="Adicionar repositórios"
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {(loading && <FaSpinner color="#FFF" size={14} />) || <FaPlus color="#FFF" size={14} />}
        </SubmitButton>
      </Form>

      <List>
        {repositories.map(repository => {
          return (
            <li key={repository.name}>
              <span>
                <DeleteButton onClick={() => deleteRepositoryFromList(repository.name)}>
                  <FaTrash size={14} />
                </DeleteButton>
                {repository.name}
              </span>
              <Link to={`repository/${encodeURIComponent(repository.name)}`}>
                <FaBars size={20} />
              </Link>
            </li>
          );
        })}
      </List>
    </Container>
  );
}