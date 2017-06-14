package com.redhat.model;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class ProductDaoImpl implements ProductDao {

   /* @Inject
    private EntityManager em;
*/
	
  @PersistenceContext(unitName="primary")
    private EntityManager em;
  

  
	@Override
	public void createProduct(Product prod) {
		em.persist(prod);
	}

	@Override
	public List<Product> getAll() {
		return em.createQuery("SELECT p FROM Product p", Product.class).getResultList();

	}

	@Override
	public Product getProductById(Integer prodID) {
		//TypedQuery<Product> tq =  em.createQuery("SELECT p FROM Product p WHERE p.productID=?1", Product.class).setParameter(1, prodID);
		//Product prod = tq.getSingleResult();
		Product prod = em.find(Product.class,prodID);
		return prod;
	}

	@Override
	//@TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
	public void deleteProduct(Integer prodID) {
	//	em.joinTransaction();
	//	em.getTransaction().begin();
		//em.createQuery("DELETE FROM Product p WHERE p.productid=?1").setParameter(1, prodID).executeUpdate();
		
		Product prod = em.getReference(Product.class, prodID);
		em.remove(prod);
		em.flush();
	//	em.getTransaction().commit();

	}

}
