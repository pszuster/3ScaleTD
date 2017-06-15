package com.redhat.model;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class StoreDaoImpl implements StoreDao {

	
  @PersistenceContext(unitName="primary")
    private EntityManager em;
  

  
	@Override
	public void createStore(Store prod) {
		em.persist(prod);
	}

	@Override
	public List<Store> getAll() {
		return em.createQuery("SELECT s FROM Store s", Store.class).getResultList();

	}

	@Override
	public Store getStoreById(Integer storeID) {
		Store prod = em.find(Store.class,storeID);
		return prod;
	}

	@Override
	public void deleteStore(Integer storeID) {

		Store prod = em.getReference(Store.class, storeID);
		em.remove(prod);

	}

}
