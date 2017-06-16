package org.mycompany;

import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.apache.camel.Processor;

import com.redhat.service.GetStore;

public class paramProc implements Processor {

	@Override
	public void process(Exchange ex) throws Exception {
		Message in = ex.getIn();
		GetStore gs = new GetStore();
		gs.setStoreID(1);
		in.setBody(gs);
		ex.setOut(in);
	}

}
